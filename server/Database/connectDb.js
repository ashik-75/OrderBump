import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(conn.connection.host);
  } catch (error) {
    console.log(error?.message);
  }
};

export default connectDB;
