// import all the dependencies here

import express from 'express';
import pool from './config/db.js';
import createTable from './src/model/createTable.js';
import userRouter from './src/router/user.routes.js';
import ProductRouter from './src/router/product.routes.js';
import jwtAuth from './src/middlewares/jwtmiddleware.js';

const app = express();
 
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/products",jwtAuth, ProductRouter)







app.listen(3000,async ()=>{
    console.log("App is running on port 3000");
    try{
        const connection = await pool.getConnection();
        
        await createTable(connection);
   

        connection.release();
        console.log('connection to MySQL database is Successful');
        console.log('Database initialization successful');
    } catch (error) {
        console.error('Error connecting to MySQL database:', error);
      }
   
})