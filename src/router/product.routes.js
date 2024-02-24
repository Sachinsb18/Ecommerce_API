// product router to handle all the product related requests

import express from 'express';
import { addProduct, deleteProduct, getProduct, getProductList, updateProduct } from '../controller/product.controller.js';


const ProductRouter = express.Router();

ProductRouter.post('/',(req,res)=>{
    addProduct(req,res);
});

ProductRouter.get("/",(req,res)=>{
    getProductList(req,res);
});

ProductRouter.get("/:id",(req,res)=>{
    getProduct(req,res);
});

ProductRouter.put("/:id",(req,res)=>{
    updateProduct(req,res);
});

ProductRouter.delete("/:id",(req,res)=>{
    deleteProduct(req,res);
});






export default ProductRouter;