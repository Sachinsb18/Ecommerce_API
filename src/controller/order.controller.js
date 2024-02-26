// controller function to manage orders

import { addOrder } from "../model/order.repository.js"



// controller function to place an order
export const placeOrder = async (req,res)=>{
    const cartId = req.params.id;
    const userId = req.userID;
    try{
        const order = await addOrder(cartId,userId);
        res.status(201).json({message:`order created successfully`,order});
    }catch(error){
        res.status(500).json({message:`Something went wrong` });
    }
}

// controller function to get order history 
export const orderHistory = async(req,res)=>{
    try{
        
    }catch(error){

    }
}