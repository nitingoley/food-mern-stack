import mongoose from "mongoose";

// const mongoose = require("mongoose");
// mongoose

// Define the Restaurant Schema
const restaurantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    cuisines: [
      {
        type: String,
        required: true,
      },
    ],
    menus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
    ],
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Export the Restaurant Model
const Restaurant = mongoose.model("Restaurant", restaurantSchema);

 
export default Restaurant;