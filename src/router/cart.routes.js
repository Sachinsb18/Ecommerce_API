

import express from "express";
import { addToCart, removeFromCart, updateQuantity } from "../controller/cart.controllers.js";

const cartRoute = express.Router();

cartRoute.post("/:id",(req,res)=>{
    addToCart(req,res);
});

cartRoute.put("/:id",(req,res)=>{
   updateQuantity(req,res);
});

cartRoute.delete("/:id", (req,res)=>{
        removeFromCart(req,res);
});



export default cartRoute;