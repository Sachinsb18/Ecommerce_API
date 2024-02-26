// routers for order placing and order history

import express from 'express';
import { placeOrder } from '../controller/order.controller.js';

const orderRoute = express.Router();

orderRoute.post('/:id',(req,res)=>{
    placeOrder(req,res);
})


export default orderRoute;