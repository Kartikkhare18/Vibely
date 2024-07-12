import mongoose, { Connection } from "mongoose";

let isConnected: Connection | boolean = false;

const connectDataBase = async () => {
  if (isConnected) {
    console.log("MongoDB Already Connected");
    return isConnected;
  }
  try {
    const res = await mongoose.connect(process.env.MONGO_URI!);
    isConnected = res.connection;
    console.log("MongoDB Connected Successfully.");
    return isConnected;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export default connectDataBase;
