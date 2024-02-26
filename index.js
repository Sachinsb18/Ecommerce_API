// import all the dependencies here

import express from 'express';
import pool from './config/db.js';
import createTable from './src/model/createTable.js';
import userRouter from './src/router/user.routes.js';
import ProductRouter from './src/router/product.routes.js';
import jwtAuth from './src/middlewares/jwtmiddleware.js';
import cartRoute from './src/router/cart.routes.js';
import orderRoute from './src/router/order.routes.js';




const app = express();


 
app.use(express.json());

// path to handle registration and login
app.use("/api/user", userRouter);

// path to handle product requests
app.use("/api/products",jwtAuth, ProductRouter);

// path to handle cart requests
app.use("/api/cart",jwtAuth, cartRoute);

// path to hamdle order requests
app.use("/api/orders",jwtAuth, orderRoute);







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