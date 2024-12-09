import express from "express";
import { isAuthentication } from "../middleware/isAuthentication.js";
const router = express.Router();
import {
  createCheckoutSession,
  getOrders,
} from "../controller/order.controller.js";

router.post(
  "/checkout/create-checkout-session",
  isAuthentication,
  createCheckoutSession
);
router.get("/", isAuthentication, getOrders);

export default router;
