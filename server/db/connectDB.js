import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URL;

const ConnectDB = async () => {
  await mongoose
    .connect(url)
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log("Error db not connected~", err));
};

export default ConnectDB;
