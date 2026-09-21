const express = require("express");

const {
    obtenirUtilisateurs,
    obtenirProfil,
    mettreAJourProfil,
    obtenirProgression
} = require("../controllers/utilisateurController");

const verifierToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", verifierToken, obtenirUtilisateurs);
router.get("/me", verifierToken, obtenirProfil);
router.put("/me", verifierToken, mettreAJourProfil);
router.get("/progression", verifierToken, obtenirProgression);

module.exports = router;