import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { signup, login, logout, getUser, allusers, connectDb } from "./index.js";

dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to the database
connectDb();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*", 
    credentials: true,
  })
);

// Routes
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const result = await signup(name, email, password);
  
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  
  res.status(201).json(result);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await login(email, password);
  
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  
  // Store userId in a cookie
  res.cookie("userId", result.userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
  });
  
  res.status(200).json(result);
});

app.get("/user", async (req, res) => {
  const userId = req.cookies.userId || req.headers["x-user-id"];
  
  if (!userId) {
    return res.status(401).json({ error: "User ID is required. Please login first." });
  }
  
  const result = await getUser(userId);
  
  if (result.error) {
    return res.status(401).json({ error: result.error });
  }
  
  res.status(200).json(result);
});

app.post("/logout", async (req, res) => {
  const userId = req.cookies.userId || req.headers["x-user-id"];
  
  if (!userId) {
    return res.status(401).json({ error: "User ID is required. Please login first." });
  }
  
  const result = await logout(userId);
  
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  
  res.clearCookie("userId");
  res.status(200).json(result);
});

app.get("/users", async (req, res) => {
  const result = await allusers();
  
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  
  res.status(200).json(result);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Auth package server running at port ${PORT}`);
});
