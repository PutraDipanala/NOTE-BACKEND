const mysql = require('mysql2');
require('dotenv').config(); // Memuat file .env

const connection = mysql.createConnection({
    host: process.env.HOST,        // Host MySQL, misalnya 'localhost'
    user: process.env.USER,        // Username MySQL
    password: process.env.PASSWORD,  // Password MySQL
    database: process.env.DATABASE  // Nama database
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Database connected successfully');
});

module.exports = connection;