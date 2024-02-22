// db.js

const mysql = require("mysql");

// Tạo kết nối đến cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
    host: process.env.HOSTNAME || "127.0.0.1",
    user: process.env.USER || "root",
    password: process.env.PASSWORD || "",
    database: process.env.DATABASE_NAME || "daivietcharacter",
});

// Kết nối vào cơ sở dữ liệu
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to database: " + err.stack);
        return;
    }
    console.log("Connected to database as id " + connection.threadId);
});

module.exports = connection;
