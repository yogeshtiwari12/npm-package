import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/model.js";
import dotenv from "dotenv";
import { verifytoken } from "../auth/auth.js";
import connectDb from "../connection.js";
import redish from "../redish/redish.js";

dotenv.config();


try {
  await connectDb();
} catch (error) {
  console.error("Database connection error:", error);
}

const jwtSecret = "abjhgfhgjklkjghjhgbnlkjbhvncnbnm,bmvnbbnm";

export const signup = async (name, email, password) => {
  try {
    if (!name || !email || !password) return { error: "All fields are required" };

    const existingUser = await User.findOne({ email });
    if (existingUser) return { error: "User already exists" };

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    return { message: "User created successfully", user: { name, email } };
  } catch (error) {
    return { error: error.message };
  }
};

export const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) return { error: "User not found" };

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return { error: "Invalid credentials" };

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "2d" });
    await redish.set(`${user._id}`, token)
    const userData = await verifytoken(token);

    if (!userData.success) {
      return { error: userData.message || "Authentication failed" };
    }

    return {
      message: "Login successful",

      userId: user._id.toString(),
      user: {
        name: userData.user.name,
        email: userData.user.email
      }
    };
  } catch (error) {
    return { error: error.message };
  }
};

export const getUser = async (userId) => {
  try {
    if (!userId) return { error: "User ID is required" };

    const token = await redish.get(userId);
    if (!token) {
      return { error: "Session expired or invalid. Please login again." };
    }
    const result = await verifytoken(token);

    if (!result.success) {
      await redish.del("useid")
      return { error: result.message || "User not found or session invalid" };
    }

    return { user: result.user };
  } catch (error) {
    console.error("User verification failed:", error);
    return { error: "Failed to fetch user", details: error.message };
  }
};

export const logout = async (userId) => {
  try {
    if (!userId) {
      return { error: "User ID is required" };
    }
    const token = redish.get("useid")

    if (!token) {
      return { error: "No active session found" };
    }
    await redish.del("useid")
    return { message: "Logout successful" };
  } catch (error) {
    return { error: "Failed to logout", details: error.message || error };
  }
};

export const allusers = async () => {
  try {
    const users = await User.find().select("-password -__v");
    return { users };
  } catch (error) {
    return { error: "Failed to fetch users", details: error.message || error };
  }
}
