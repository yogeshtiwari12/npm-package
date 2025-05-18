import { getUser, allusers, logout } from "./index.js";

const token = 'YOUR_VALID_TOKEN_HERE';

await connectDb();
  
  try {
    const userResult = await getUser(token);
    console.log("Get User result:", userResult);
  } catch (error) {
    console.error("Get User failed:", error);
  }

  try {
    const allUsersResult = await allusers();
    console.log("All Users result:", allUsersResult);
  } catch (error) {
    console.error("All Users failed:", error);
  }
  
  try {
    const logoutResult = await logout(token);
    console.log("Logout result:", logoutResult);
  } catch (error) {
    console.error("Logout failed:", error);
  };