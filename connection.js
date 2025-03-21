import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();


const connectDb = async(req,res)=>{

try {

 await mongoose.connect("mongodb://127.0.0.1:27017/backend2", {
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