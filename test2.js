import { signup, login, getUser, allusers, logout, connectDb } from './index.js';

// First connect to MongoDB
await connectDb();

// Register a new user
const signupResult = await signup('User Name', 'user@example.com', 'password123');
console.log(signupResult);
// { message: "User created successfully", user: { name: "User Name", email: "user@example.com" } }

// Login with credentials
const loginResult = await login('user@example.com', 'password123');
console.log(loginResult);


const token = loginResult.token;

// Get user information with token
const userResult = await getUser(token);
console.log(userResult);


// Get all users
const allUsersResult = await allusers();
console.log(allUsersResult);
// { users: [{ _id: "...", name: "User Name", email: "user@example.com" }, ...] }

// Logout user
const logoutResult = await logout(token);
console.log(logoutResult);