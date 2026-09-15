import mongoose from "mongoose";
import dotenv from "dotenv";
// function to connect to the database
const connectDB = async () => {

    mongoose.connection.on('connected',() => console.log('Databse Connected'));

    await mongoose.connect(process.env.MONGODB_URI)
}

export default connectDB;