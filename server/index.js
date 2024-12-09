import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./db/connectDB.js";
dotenv.config();
// Initialize the Express app
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import restaurantRoute from "./routes/restaurant.route.js";
import menuRoute from "./routes/menu.route.js";
import orderRoute from "./routes/order.route.js";
import path from "path";

// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

 
// middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
 

// endpoint
app.use("/api/v1/users", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

app.use(express.static(path.join(__dirname, "../client/dist")));

// Serve the index.html for all other routes (for client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});
 
const PORT = process.env.PORT || 5000;
console.log(`Using port: ${PORT}`);
app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server is running on port ${PORT}`);
});

