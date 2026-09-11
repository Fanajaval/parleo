const express = require("express");

const {
    inscrire,
    connecter
} = require("../controllers/authController");

const router = express.Router();

router.post("/inscription", inscrire);
router.post("/connexion", connecter);

module.exports = router;