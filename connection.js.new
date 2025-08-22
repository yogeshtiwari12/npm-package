import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database:', mongoose.connection.db.databaseName);
    return true;
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    return false;
  }
}

export default connectDb;
