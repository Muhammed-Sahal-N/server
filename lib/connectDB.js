import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB is connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;