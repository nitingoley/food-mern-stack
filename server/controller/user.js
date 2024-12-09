import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import cloudinary from "../utils/cloudinary.js";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { generateToken } from "../utils/generateToken.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email.js";

// export const signup = async (req, res) => {
//     try {
//         const { fullname, email, password, contact } = req.body;

//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User already exist with this email"
//             })
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const verificationToken =  generateVerificationCode();

//         user = await User.create({
//             fullname,
//             email,
//             password: hashedPassword,
//             contact: Number(contact),
//             verificationToken,
//             verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
//         })
//         generateToken(res,user);

//         await sendVerificationEmail(email, verificationToken);

//         const userWithoutPassword = await User.findOne({ email }).select("-password");
//         return res.status(201).json({
//             success: true,
//             message: "Account created successfully",
//             user: userWithoutPassword
//         });
//     } catch (error) {

//         return res.status(500).json({ message: "Internal server error" })
//     }
// };

// now signup page here

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, contact } = req.body;

    // Check if user already exists with the same email
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification token
    const verificationToken = generateVerificationCode();

    // Create new user
    user = await User.create({
      fullname,
      email,
      password: hashedPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // Token expires in 24 hours
    });

    // Generate a token for the user (JWT or other token)
    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    // Send the verification email
    await sendVerificationEmail(email, verificationToken);

    // Fetch user without password to send in the response
    const userWithoutPassword = await User.findOne({ email }).select(
      "-password"
    );

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // If user is not found
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // Generate token and set cookie
    generateToken(res, user); // Pass res and user to generate token

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    // Send user without password
    const userWithoutPassword = await User.findOne({ email }).select("-password");

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullname}`,
      user: userWithoutPassword,
    });
  } catch (error) {
  
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const verifyEmail = async (req, res) => {
  try {
    const { verificationCode } = req.body;

    const user = await User.findOne({
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // send welcome email
    await sendWelcomeEmail(user.email, user.fullname);

    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      user,
    });
  } catch (error) {

    return res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = async (req, res) => {
  try {
    return res.clearCookie("token").status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {

    return res.status(500).json({ message: "Internal server error" });
  }
};
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;
    await user.save();

    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
    );

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }
    //update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    await user.save();

    // send success reset email
    await sendResetSuccessEmail(user.email);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const checkAuth = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { fullname, email, address, city, country, profilePicture } =
      req.body;
    // upload image on cloudinary
    let cloudResponse;
    cloudResponse = await cloudinary.uploader.upload(profilePicture);
    const updatedData = {
      fullname,
      email,
      address,
      city,
      country,
      profilePicture,
    };

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};