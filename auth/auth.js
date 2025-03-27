import jwt from 'jsonwebtoken';
import User from '../model/model.js';

const jwtkey = "234567890989765453dfdgfbdv"; 

export const verifytoken = async (token) => {
   try {
   
    if(!token){
        return { message: 'Token not found' };
    }
   const decoded = jwt.verify(token,jwtkey);

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

