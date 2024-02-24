import dotenv from 'dotenv';
dotenv.config();

export default async function createTable(connection){

 // Select the database
const dbName =process.env.MYSQL_DATABASE
await connection.query(`USE ${dbName}`);

// Create table if it doesn't exist
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
}