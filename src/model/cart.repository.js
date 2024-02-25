

import pool from "../../config/db.js";
import { createCartTable } from "./createTable.js";


// function to insert product into cart
export const insertIntoCart = async (productId,userId,quantity)=>{
    // to create table name for cart
    let tablename;
    let title, category_Id,price;
    try{
        const connection =await pool.getConnection();
        // finding if usser exist 
        const [user] = await connection.query(`SELECT * FROM users Where id=?`,[userId]);
       
        // return error if usser dont exist or get the user name
       if(user.length === 0){
         throw new Error('User not found');
       }else{
        const name = user[0].username.toLowerCase().replace(/\s/g, '');
         tablename = `${name}cart`;   //apending cart at the end of user name
        createCartTable(tablename);   // creating acrt table with username
       }
        
    //    getting deatils of product from products table of selected id
       const [product] = await connection.query(`SELECT * FROM products WHERE id=?`,[productId]);

       if(product.length === 0){
         throw new Error('Product not found');
       }
       else{
        const item = product[0];
        title = item.title;
        category_Id = item.category_id;
        price = item.price;
       }

    //    inserting the selected iten into cart table
       const [result] = await connection.query(`INSERT INTO ${tablename} (productId,userId,title,category_Id,price,quantity) VALUES (?,?,?,?,?,?)`,[productId,userId,title,category_Id,price,quantity]);
        // console.log(tablename);
        // console.log(result);
        return result;
    }catch(error){
        console.log(error);
        throw error;
    }
}

// function to update cart quantity
export const updateCart = async (productId,userId,quantity)=>{
//    getting tabel name from userId
    let tablename;
    
    try{
        const connection =await pool.getConnection();
        const [user] = await connection.query(`SELECT * FROM users Where id=?`,[userId]);
       
       if(user.length === 0){
         throw new Error('User not found');
       }else{
        const name = user[0].username.toLowerCase().replace(/\s/g, '');
         tablename = `${name}cart`;
       }

       const [product] = await connection.query(`UPDATE ${tablename} SET quantity = ? WHERE productId=? `,[quantity, productId]);
    //    console.log(product);
       return product;
    }catch(error){
        console.log(error);
        throw error;
    }
} 


// function to delete an product from the cart using product id
export const deleteFromCart = async (productId,userId)=>{
    //    getting tabel name from userId
    let tablename;
    
    try{
        const connection =await pool.getConnection();
        const [user] = await connection.query(`SELECT * FROM users Where id=?`,[userId]);
       
       if(user.length === 0){
         throw new Error('User not found');
       }else{
        const name = user[0].username.toLowerCase().replace(/\s/g, '');
         tablename = `${name}cart`;
       }

       //  deleteing the item 
         const [result] = await connection.query(`DELETE FROM ${tablename} WHERE productId=?`,[productId]);
        console.log(result);
        if(result.affectedRows ===0){
            throw new Error('Product not found');
        }
         return result;
    }catch(error){
        console.log(error);
        throw error;
    }
} 