import dotenv from 'dotenv';

dotenv.config();

import pool from '../../config/db.js';  // for creating cart tables

const dbName =process.env.MYSQL_DATABASE;

export default async function createTable(connection){

 // Select the database

await connection.query(`USE ${dbName}`);

// Create user table if it doesn't exist
await connection.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);
await connection.query(`
    CREATE TABLE IF NOT EXISTS products(
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      price VARCHAR(255) NOT NULL,
      quantity INT NOT NULL CHECK (quantity>0),
      category_id INT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      
    )
`)

const created = await connection.query(`
      CREATE TABLE IF  NOT EXISTS categories(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )     
`)
  
// if(count===1){ 
//     // console.log(created.affectedRows);
//     await connection.query(`
//         INSERT INTO categories (name) VALUES 
//         ('books'),
//         ('jewellery'),
//         ('footware'),
//         ('electronics'),
//         ('clothings');
//     `)
//  }
//  count++;
}

// function to create cart table
export async function createCartTable (tablename){

  const connection = await pool.getConnection();
  await connection.query(`USE ${dbName}`);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS ${tablename}(
      id INT AUTO_INCREMENT PRIMARY KEY,
      productId INT NOT NULL,
      userId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      category_Id INT NOT NULL,
      price INT NOT NULL,
      quantity INT NOT NULL CHECK (quantity>0),
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      
    )
`)

}


// function to create orders table
export async function createOrderTable (tablename){

  const connection = await pool.getConnection();
  await connection.query(`USE ${dbName}`);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS ${tablename}(
      id INT AUTO_INCREMENT PRIMARY KEY,
      productId INT NOT NULL,
      userId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      category_Id INT NOT NULL,
      price INT NOT NULL,
      quantity INT NOT NULL CHECK (quantity>0),
      total INT AS (quantity * price) STORED, 
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      
    )
`)

}