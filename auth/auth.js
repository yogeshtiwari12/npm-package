import jwt from 'jsonwebtoken';
import User from '../model/model.js';

const jwtkey = "yogesh123";

export const verifytoken = async (req, res,next) => {
   try {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message: 'Token not found' });
    }
   const decoded = jwt.verify(token,jwtkey);
  //  console.log("decoded",decoded)

   const user = await User.findById(decoded.id);
   if(!user){
     return res.status(401).json({ message: 'User is not valid' });
   }

   req.user = user; 
   next()

   } 
   
   catch (error) {
    return res.status(500).json({ message: 'Authentication failed' }); // Handle errors
   }
}

