import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const connectDb = async(req,res)=>{

try {
    await mongoose.connect("mongodb+srv://yt781703:c9aakPSitHBgIJsn@cluster0.x2rr6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });

    console.log('Connected to database:', mongoose.connection.db.databaseName);
  
} catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
}
}

export default connectDb;