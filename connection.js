import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://yt781703:TpDuRAUTt6lQpYWl@cluster0.51gknie.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {

    });
    console.log("Connected to database:", mongoose.connection.db.databaseName);
    return true;

  
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    return false;
  }
};
connectDb();
export default connectDb;
