import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // verify the token
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    // check is decode was successfull
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server errror" });
  }
};
