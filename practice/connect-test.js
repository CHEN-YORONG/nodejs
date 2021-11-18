require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test111',
    port: 3306,
});
console.log(process.env.DB_HOST,process.env.DB_USER,process.env.DB_PASS,process.env.DB_NAME);
connection.query(
    "SELECT * FROM address_book LIMIT 2,3",
    (error, r)=>{
        console.log(error, r);
        process.exit();
    });