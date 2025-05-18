import jwt from 'jsonwebtoken';
import User from '../model/model.js';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = "abjhgfhgjklkjghjhgbnlkjbhvncnbnm,bmvnbbnm";

export const verifytoken = async (token) => {
   try {
   
    if(!token){
        return { message: 'Token not found' };
    }
   const decoded = jwt.verify(token, jwtSecret);

   const user = await User.findById(decoded.id).select('-password -__v'); 
   if(!user){
     return { message: 'User is not valid' };
   }

    return { success:true , user };

   } 
   
   catch (error) {
    return { message: 'Authentication failed' ,error}; // Handle errors
   }
}

