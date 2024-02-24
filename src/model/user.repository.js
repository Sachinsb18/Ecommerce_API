import pool from '../../config/db.js';

export async function addUser(username, email, password){
    try{
        const connection = await pool.getConnection();
        const [result] = await connection.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
          );
        
        connection.release(); 
        // console.log(result);
        return result.affectedRows; 
    } catch(error){
        console.log(error);

    }
}