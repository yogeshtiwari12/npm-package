import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },

  password:{
    type: String,
    required:true
  },
 

});


const User = mongoose.model('User', userSchema); // mydb database hai or mydb2 collection hai 

export default User;
