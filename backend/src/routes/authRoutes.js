const express = require("express");

const {
    inscrire
} = require("../controllers/authController");

const router = express.Router();

router.post("/inscription", inscrire);

module.exports = router;