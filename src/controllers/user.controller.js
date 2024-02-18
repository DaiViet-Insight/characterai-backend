const userService = require("../services/user.service.js");

module.exports = {
    login: async (req, res) => {
        try {
            const result = await userService.login(req.body);
            console.log(result);
            // Check if the result contains an error property
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
