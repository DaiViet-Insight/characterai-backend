const characterService = require("../services/character.service");
const jwtService = require("../services/jwt.service");

module.exports = {
    getAllCharacters: async (req, res) => {
        try {
            const result = await characterService.getAllCharacters(
                jwtService.decodeToken(req.headers.authorization.substring(7))
                    .id
            );
            if (result.error) {
                res.status(result.statusCode || 500).json({
                    error: result.message,
                });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },
    getCharacterById: async (req, res) => {
        try {
            const result = await characterService.getCharacterById(
                req.params.id,
                jwtService.decodeToken(req.headers.authorization.substring(7))
                    .id
            );
            if (result.error) {
                res.status(result.statusCode || 500).json({
                    error: result.message,
                });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    },
};
