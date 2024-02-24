// data CRUD operations done here
// All data manipulation logic is here

import pool from "../../config/db.js";


// function to insert  an product into database
export const insertProduct = async (product)=>{
    const {title,description,price,quantity,category_id} = product;
    try{
        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'INSERT INTO products (title,description,price,quantity,category_id) VALUES (?, ?, ?, ?, ?)',
            [title,description,price,quantity,category_id]
          );
        
        connection.release(); 
        // console.log(result[0]);
        return result; 

    }catch(error){
        console.log(error);
        throw error;        
    }
}


// fucntion to fetch all the products from the table
export const getAllProducts = async ()=>{
    try{
            const connection = await pool.getConnection();
            const [result] =  await connection.query(`SELECT * FROM products`);
            connection.release();
            return result;
    }catch(error){
        // console.log(error);
        throw error;
    }
}


// function to get product by its id
export const getProductById = async (id)=>{ 
    try{
        const connection = await pool.getConnection();
        const [result] = await connection.query(`SELECT * FROM products WHERE id=?`,[id]);
        connection.release();
        // console.log(result);
        if(result.length === 0) return null;
        return result;
    }catch(error){
        console.log(error);
        throw error;
    }
};

// function to update the products qty and price based on product id
export const updateProductById = async (id, updateData)=>{
    const {field,value} = updateData;

    //  To know which field to update, we only need to update price or quantity at any point
    let sqlQuery;
    let params;

    switch(field){
        case 'price':
            sqlQuery = `UPDATE products SET price=? WHERE id=?`;
            params = [value,id];
            break;
        case 'quantity':
            sqlQuery = `UPDATE products SET quantity=? WHERE id=?`;
            params = [value,id];
            break;
        default:
            return null;
    }

    try{
        const connection = await pool.getConnection();
        const [result] = await connection.query(sqlQuery,params);
        connection.release();
        return result;
    }catch(error){
        console.log(error);
        throw error;
    }

} 

// function to delete a product from the product id
export const deleteProductById = async (id)=>{
    try{
        const connection = await pool.getConnection();
        const [result] = await connection.query(`DELETE FROM products WHERE id=?`,[id]);
        connection.release();
            // Check if the DELETE statement affected any rows
            if (result.affectedRows === 0) {
                throw new Error('Product not found');
            }
    
            return { message: 'Product deleted successfully' };
    }catch(error){
        console.log(error);
        throw error;
    }
}