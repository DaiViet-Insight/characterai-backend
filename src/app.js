const express = require('express');
const app = express();

// CORS error handling
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // '*' for all
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method == "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "PUT, POST, PATCH, DELETE, GET"
        ); // '*' for all
        return res.status(200).json({});
    }
    next();
});

app.use('/api/users', require('./routes/user.js'));

module.exports = app;