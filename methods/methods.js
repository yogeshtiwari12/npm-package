import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/model.js";
import { verifytoken } from "../index.js";


const jwtkey = "234567890989765453dfdgfbdv";

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

    const token = jwt.sign({ id: user._id }, jwtkey, { expiresIn: "2d" });

  
    await getUser(token);

    return {
       message: "Login successful", token 
      };
  } catch (error) {
    return { error: error.message };
  }
};


export const getUser = async (token) => {
  try {
    if (!token) return { error: "Token is required" };

    const user = await verifytoken(token, jwtkey);
    
    if (!user) {
      return { error: "User not found or token invalid" };
    }

    return { user };
  } catch (error) {
    console.error("Token verification failed:", error);
    return { error: "Failed to fetch user", details: error.message };
  }
};


export const logout = async (token) => {
  try {
    if (!token) {
      return { error: "Token not found" };
    }
    const cookieHeader = `token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

    return { message: "Logout successful", clearCookie: cookieHeader };
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