// All order placement request handled here

import pool from "../../config/db.js";
import { createOrderTable } from "./createTable.js";


// function to place an order 
export const addOrder = async (cartId,userId)=>{
    let cartTable;
    let tableName;
    try{
        const connection =await pool.getConnection();
        const [user] = await connection.query(`SELECT * FROM users Where id=?`,[userId]);
       
       if(user.length === 0){
         throw new Error('User not found');
       }else{
        const name = user[0].username.toLowerCase().replace(/\s/g, '');
         cartTable = `${name}cart`;
       }

       const [cart] = await connection.query(`SELECT * FROM ${cartTable} Where id=?`,[cartId]);
       
       if(cart.length === 0){
         throw new Error(' Item not in cart');
       }else{
        const name = user[0].username.toLowerCase().replace(/\s/g, '');
         tableName = `${name}orders`;
          await createOrderTable(tableName);
       }

       const {productId, title, category_Id,price,quantity} = cart[0];

       const [order] = await connection.query(`INSERT INTO ${tableName} (productId,userId,title,category_Id,price,quantity) VALUES (?,?,?,?,?,?)`,[productId,userId,title,category_Id,price,quantity]);

       connection.release();
       // console.log(order);
       return order;
    }catch(error){
        console.log(error);
        throw error;
    }
}


// function to get order history
// export const getOrderHistory = async (userId)=>{
    
//     let tableName;
//     try{
//         const connection =await pool.getConnection();
//         const [user] = await connection.query(`SELECT * FROM users Where id=?`,[userId]);
       
//        if(user.length === 0){
//          throw new Error('User not found');
//        }else{
//         const name = user[0].username.toLowerCase().replace(/\s/g, '');
//          tableName = `${name}orders`;
//        }


//        const [order] = await connection.query(`SELECT * FROM ${tableName}`);

//        connection.release();
//        const item = order[0];
//        const details={

//        }

//     }catch(error){

//     }
// }