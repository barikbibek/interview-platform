import mongoose from "mongoose";
import { ENV } from "./env";

export const connectDB = async () => {
    try {
        if(!ENV.DB_URL){
            throw new Error("DB_URL is not defined in environment variables")
        }
        await mongoose.connect(ENV.DB_URL)
        console.log("✅ Connected to mongoDB")
    } catch (error) {
        const err = error as Error
        console.log(`❌ MongoDB connection Error: ${err.message}`)
    }
}
