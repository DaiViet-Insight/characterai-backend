const util = require("util");
const connection = require("../services/db.js");

// Promisify the query function
const queryAsync = util.promisify(connection.query).bind(connection);

module.exports = {
    getAllCharacters: async (currentUserId) => {
        try {
            const query =
                "SELECT c.id, c.name, c.avatar, c.background, c.description, c.price, CASE WHEN uc.userId IS NOT NULL THEN false ELSE true END AS isLocked FROM characters c LEFT JOIN user_characters uc ON c.id = uc.charactorId AND uc.userId = " +
                currentUserId;
            const results = await queryAsync(query);
            return results;
        } catch (error) {
            console.error(error);
            throw {
                message: "Internal Server Error",
                statusCode: 500,
            };
        }
    },
    getCharacterById: async (id, currentUserId) => {
        try {
            const query =
                "SELECT c.id, c.name, c.avatar, c.background, c.description, c.price, CASE WHEN uc.userId IS NOT NULL THEN false ELSE true END AS isLocked FROM characters c LEFT JOIN user_characters uc ON c.id = uc.charactorId AND uc.userId = " +
                currentUserId +
                " WHERE c.id = " +
                id;
            const results = await queryAsync(query);
            if (results.length > 0) {
                return results[0];
            } else {
                throw {
                    message: "Character not found",
                    statusCode: 404,
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
