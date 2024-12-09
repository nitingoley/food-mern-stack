import Restaurant from "../models/restaurant.js";
import uploadImageOnCloudinary from "../utils/imageUpload.js";
import Order from "../models/order.js";

// create new restaurant

export const createRestaurant = async (req, res) => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    

    const file = req.file;
    const restaurant = await Restaurant.findOne({ user: req.id });
    if (restaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant already exist by another user",
      });
    }

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const imageUrl = await uploadImageOnCloudinary(file);
    await Restaurant.create({
      user: req.id,
      restaurantName,
      city,
      country,
      deliveryTime,
      cuisines: JSON.parse(cuisines),
      imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Restaurant Added",
    });
  } catch (error) {
   
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get restaurants

export const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id }).populate(
      "menus"
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        restaurant: null,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// update restaurant

export const updateRestaurant = async (req, res) => {
  try {
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;
    const file = req.file;
    const restaurant = await Restaurant.findOne({ user: req.id });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryTime = deliveryTime;
    restaurant.cuisines = JSON.parse(cuisines);

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(file);
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();

    return res.status(200).json({
      success: true,
      message: "Restaurant updated",
      restaurant,
    });
  } catch (error) {
  
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getRestaurantOrder = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id });

    if (!restaurant) {
      return res.status(401).json({
        success: false,
        message: "Order not found",
      });
    }
    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {

    return res.status(500).json({ message: "Internal server error" });
  }
};
// check update status or items  /
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.body;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(401).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Status updated",
      status: order.status,
    });
  } catch (error) {
   
    return res.status(500).json({ message: "Internal server error" });
  }
};

// advance filter or search functionality implement with the help of mongodb

//filter or search by name or search by cuisines

export const searchRestaurant = async (req, res) => {
  try {
    const searchText = req.params.searchText || "";
    const searchQuery = req.query.searchQueryas || "";
    const selectedCuisines = (req.query.selectedCuisines || "")
      .split(",")
      .filter((cuisine) => cuisine);
    const query = {};
    // basic search based on searchText (name ,city, country)


    if (searchText) {
      query.$or = [
        { restaurantName: { $regex: searchText, $options: "i" } },
        { city: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } },
      ];
    }
    // filter on the basis of searchQuery
    if (searchQuery) {
      query.$or = [
        { restaurantName: { $regex: searchQuery, $options: "i" } },
        { cuisines: { $regex: searchQuery, $options: "i" } },
      ];
    }
   
    // ["momos", "burger"]
    if (selectedCuisines.length > 0) {
      query.cuisines = { $in: selectedCuisines };
    }

    const restaurants = await Restaurant.find(query);
    return res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {

    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getSingleRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId).populate({
      path: "menus",
      options: { createdAt: -1 },
    });
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }
    return res.status(200).json({ success: true, restaurant });
  } catch (error) {

    return res.status(500).json({ message: "Internal server error" });
  }
};
