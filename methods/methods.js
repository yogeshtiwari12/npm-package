
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/model.js";
import dotenv from "dotenv";
dotenv.config();  
console.log(process.env.N)

const jwtkey = "abjhgfhgjklkjghjhgbnlkjbhvncnbnm,bmvnbbnm";



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

    console.log(jwtkey)
    const token = jwt.sign({ id: user._id }, jwtkey, { expiresIn: "2d" });

    return { message: "Login successful", token };
  } catch (error) {
    return { error: error.message };
  }
};

export const getAllUsers = async () => {
  try {
    return await User.find({}, "-password");
  } catch (error) {
    return { error: "Failed to fetch users" };
  }
};

export const getUser = async () => {
  try {
    const user = req.user;
    if(!user) return { error: "User not found" };
    return { user: user };
  } catch (error) {
    return { error: "Failed to fetch user" };
  }
}
export const logout = async () => {
  try {
    const token  = req.cokkies.token;
    if(!token) return { error: "User not found" };
    res.clearCookie("token");
    return { message: "Logout successful" };
  } catch (error) {
    return { error: "Failed to logout" };
  }
}