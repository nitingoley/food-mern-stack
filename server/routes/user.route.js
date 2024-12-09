import express from "express";
import {
  checkAuth,
  forgetPassword,
  login,
  logout,
  resetPassword,
  signup,
  updateProfile,
  verifyEmail,
} from "../controller/user.js";
import { isAuthentication } from "../middleware/isAuthentication.js";
const router = express.Router();

router.route("/check-auth").get(isAuthentication, checkAuth);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/verify-email").post(verifyEmail);
router.route("/forget-password").post(forgetPassword);
router.route("/forget-password/:token").post(resetPassword);
router.route("/profile/update").put(isAuthentication, updateProfile);

export default router;
