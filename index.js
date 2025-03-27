import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {login,signup,logout,getUser,allusers} from "./methods/methods.js"
import {verifytoken} from "./auth/auth.js"


import dotenv from "dotenv";
import connectDb from "./connection.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;



connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*", 
    credentials: true,
  })
);

export {signup, login, logout,getUser,allusers,verifytoken} 

app.listen(PORT, () => {
  console.log(`🚀 Auth package server running at port ${PORT}`);
});
