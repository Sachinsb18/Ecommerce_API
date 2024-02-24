// import mysql2 dependencies
import dotenv from'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';


const config = {
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
    timezone:'Z',
    dateString:true,
    waitForConnections: true
}

/*Connection pools help reduce the time spent connecting to the MySQL server by reusing a previous connection, leaving them open instead of closing when you are done with them.

This improves the latency of queries as you avoid all of the overhead that comes with establishing a new connection.
*/
const pool = mysql.createPool(config);

export default pool;