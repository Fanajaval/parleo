const express = require("express");

const {
    obtenirUtilisateurs
} = require("../controllers/utilisateurController");

const router = express.Router();

router.get("/", obtenirUtilisateurs);

module.exports = router;