import express from "express";
const router = express.Router();
import { isAuthentication } from "../middleware/isAuthentication.js";
import { addMenu, editMenu } from "../controller/menu.controller.js";
import upload from "../middleware/multer.js";
router.post("/", isAuthentication, upload.single("image"), addMenu);
router.put("/:id", isAuthentication, upload.single("image"), editMenu);

export default router;
