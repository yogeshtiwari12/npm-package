import {login,signup,logout,getUser,allusers} from "./methods/methods.js";
import {verifytoken} from "./auth/auth.js";
import connectDb from "./connection.js";

export { 
  signup, 
  login, 
  logout,
  getUser,
  allusers,
  verifytoken,
  connectDb
};


