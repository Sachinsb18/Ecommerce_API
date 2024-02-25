// conttroller function to handle cart actions

import { insertIntoCart, updateCart ,deleteFromCart} from "../model/cart.repository.js";

// import cart repository functions



// contrtoller to handle add to cart
export const addToCart =async (req,res)=>{
    const userId = req.userID;
    const productId = req.params.id;
    const {quantity} = req.body;
    // console.log(productId);
    // console.log(userId);
    try{
        const product = await insertIntoCart(productId,userId,quantity);
        res.status(201).json(product);
    }catch(error){
        res.status(404).json({error: error.message});

    }
};


// controller to update the quantity of an item/product
export const updateQuantity = async (req,res)=>{
    const userId = req.userID;
    const productId = req.params.id;
    const {quantity} = req.body;
    try{
        
        const updatedProduct = await updateCart(productId,userId,quantity);
            res.status(202).json(updatedProduct);
    }catch(error){
        res.status(404).json({message:'Something went wrong. Please try again'});
    }
};

// controller to delete an item from the cart
export const removeFromCart = async (req,res)=>{
    const userId = req.userID;
    const productId = req.params.id;
    try{
        const result = await deleteFromCart(productId,userId);
        res.status(202).json({message:'product removed from cart',result});
    }catch(error){
        res.status(404).json({error: error.message});
    }
};
