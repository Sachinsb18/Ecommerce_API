// controller to handle all the product related requests



// import product repository to peform CRUD operations on products
import { getAllProducts, getProductById, insertProduct, updateProductById, deleteProductById } from '../model/product.repository.js';


// controller function to add a new product
export const addProduct = async (req,res)=>{  
    try{
            const product =  await insertProduct(req.body);            
                res.status(201).json({message:'Item added successfully',product: product});            
    }catch(error){
        res.status(500).json({message:`Something went wrong` });
    }
};


// controller function to get a product based on product id
export const getProduct = async (req,res)=>{
    const id = req.params.id;
    try{
        const product = await getProductById(id);
        if(!product){
            res.status(404).json({message:`Product with ${id} not found`});
        }
        res.status(200).json({product: product});
    }catch(error){
        res.status(500).json({message:"Something went wrong"});
    }
};


// /controller function to get all products from the table
export const getProductList = async (req,res)=>{
    try{
            const products = await getAllProducts();
            res.status(200).json({products: products});
    }catch(error){
        res.status(500).json({message:`Something went wrong. Please try again`});
    }
};


// controller function to update a product based on product id
export const updateProduct = async (req,res)=>{
    const updateData = req.body;
    const id = req.params.id;
    try{
        const product =  await updateProductById(id, updateData);
        res.status(202).json({message:'Update successful',product})
    }catch(error){
        res.status(500).json({message:'Update failed',error});
    }
};


// controller function for deleting a product
export const deleteProduct = async (req,res)=>{
    const id = req.params.id;
    try{
            const result = await deleteProductById(id);
            res.status(202).json(result);
    }catch(error){
        res.status(404).json({error: error.message});
    }
};

