const express = require("express");
const router = express.Router();
const characterController = require("../controllers/character.controller.js");

router.get("/:id", characterController.getCharacterById);
router.get("/", characterController.getAllCharacters);

module.exports = router;
