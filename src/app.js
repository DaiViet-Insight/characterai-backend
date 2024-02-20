const express = require("express");
const app = express();
const router = express.Router();
const userMiddleware = require("./middleware/user.middleware.js");
const path = require('path');

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

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", router);
app.use("/api/users", require("./routes/user.route.js"));
app.use(
    "/api/characters",
    userMiddleware.Validate,
    require("./routes/character.route.js")
);
app.use('/assets/images/character', express.static(path.join(__dirname, 'images', 'characters')));

router.get("/", (req, res, next) => {
    res.send("Server is running ...");
});

module.exports = app;
