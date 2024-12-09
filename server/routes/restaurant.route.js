import express from "express";
import { isAuthentication } from "../middleware/isAuthentication.js";
import upload from "../middleware/multer.js";

import {
  createRestaurant,
  getRestaurant,
  getRestaurantOrder,
  getSingleRestaurant,
  searchRestaurant,
  updateOrderStatus,
  updateRestaurant,
} from "../controller/restaurant.controller.js";

const router = express.Router();

/**
 * Endpoint to create a new restaurant
 */
router.post(
  "/",
  isAuthentication,
  upload.single("imageFile"),
  createRestaurant
);

/**
 * Endpoint to fetch all restaurants
 */
router.get("/", isAuthentication, getRestaurant);

/**
 * Endpoint to update restaurant details
 */
router.put(
  "/",
  isAuthentication,
  upload.single("imageFile"),
  updateRestaurant
);

/**
 * Endpoint to fetch orders of a restaurant
 */
router.get("/order", isAuthentication, getRestaurantOrder);

/**
 * Endpoint to update the status of a specific order
 */
router.put("/order/:orderId/status", isAuthentication, updateOrderStatus);

/**
 * Endpoint to search for restaurants by text
 */
router.get("/search/:searchText", isAuthentication, searchRestaurant);

/**
 * Endpoint to fetch details of a specific restaurant
 */
router.get("/:id", isAuthentication, getSingleRestaurant);

export default router;

