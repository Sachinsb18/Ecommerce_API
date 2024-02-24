import dotenv from 'dotenv';
dotenv.config();

export default async function createTable(connection){

 // Select the database
const dbName =process.env.MYSQL_DATABASE
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
  
// if(created){ 
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
}