const express = require("express");

const {
    obtenirUtilisateurs
} = require("../controllers/utilisateurController");

const verifierToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifierToken, obtenirUtilisateurs);

module.exports = router;