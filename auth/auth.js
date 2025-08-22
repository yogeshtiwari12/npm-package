import jwt from 'jsonwebtoken';
import User from '../model/model.js';

const jwtSecret = "yogesh12345sGDSDSs";

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

     console.log(user)
    return { success:true , user };

   } 
   
   catch (error) {
    return { message: 'Authentication failed' ,error}; 
   }
}

