import mongoose from "mongoose";
import userModel from "../models/userModel.js";

export const connectDb = async ()=>{
    await mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
        console.log("DB connected");
    }).catch((err)=>{
        console.log(err);
    });
}