import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price:{
    type:Number,
    required:true,
  },
  image:{
    type:String,
  },
},{timestamps:true});



const Menu = mongoose.model("Menus", menuSchema); 

export default Menu;