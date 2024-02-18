const util = require("util");
const connection = require("../services/db.js");
const jwt = require("jsonwebtoken");

// Promisify the query function
const queryAsync = util.promisify(connection.query).bind(connection);

module.exports = {
    login: async (data) => {
        try {
            const query =
                "SELECT * FROM users WHERE username = ? AND password = ?";
            const results = await queryAsync(query, [
                data.username,
                data.password,
            ]);

            if (results.length > 0) {
                const token = jwt.sign(
                    {
                        id: results[0].id,
                        username: results[0].username,
                    },
                    "secret",
                    {
                        expiresIn: "24h",
                    }
                );
                console.log(token);
                return {
                    message: "Auth successful",
                    token: token,
                };
            } else {
                throw {
                    message: "Auth failed",
                    statusCode: 401,
                };
            }
        } catch (error) {
            console.error(error);
            throw {
                message: "Internal Server Error",
                statusCode: 500,
            };
        }
    },
};
