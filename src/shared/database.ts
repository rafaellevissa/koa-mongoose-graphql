import mongoose, { connection } from "mongoose";
import { config } from "../config/config";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongo.url!);
  } catch (error) {
    console.log(`mongo-error: ${(error as Error).message}`);
  }
};

export const closeDb = (): Promise<void> => connection.close();
