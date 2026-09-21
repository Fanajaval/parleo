const pool = require("../config/database");

const obtenirUtilisateurs = async (req, res) => {
    try {
        const [utilisateurs] = await pool.query(
            "SELECT id, nom, email, niveau, date_creation FROM utilisateurs"
        );

        res.json(utilisateurs);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur lors de la récupération des utilisateurs."
        });
    }
};

const obtenirProfil = async (req, res) => {
    try {
        const utilisateurId = req.utilisateur?.id;

        if (!utilisateurId) {
            return res.status(401).json({ message: "Utilisateur non authentifié." });
        }

        const [utilisateurs] = await pool.query(
            "SELECT id, nom, email, niveau, date_creation FROM utilisateurs WHERE id = ?",
            [utilisateurId]
        );

        if (utilisateurs.length === 0) {
            return res.status(404).json({ message: "Utilisateur introuvable." });
        }

        res.json(utilisateurs[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération du profil." });
    }
};

const mettreAJourProfil = async (req, res) => {
    try {
        const utilisateurId = req.utilisateur?.id;
        const { nom, niveau } = req.body;

        if (!utilisateurId) {
            return res.status(401).json({ message: "Utilisateur non authentifié." });
        }

        if (!nom && !niveau) {
            return res.status(400).json({ message: "Aucune donnée à mettre à jour." });
        }

        const updates = [];
        const values = [];

        if (nom) {
            updates.push("nom = ?");
            values.push(String(nom).trim());
        }

        if (niveau) {
            updates.push("niveau = ?");
            values.push(String(niveau).toUpperCase());
        }

        values.push(utilisateurId);

        await pool.query(
            `UPDATE utilisateurs SET ${updates.join(", ")} WHERE id = ?`,
            values
        );

        const [utilisateurs] = await pool.query(
            "SELECT id, nom, email, niveau, date_creation FROM utilisateurs WHERE id = ?",
            [utilisateurId]
        );

        res.json({
            message: "Profil mis à jour avec succès.",
            utilisateur: utilisateurs[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour du profil." });
    }
};

const obtenirProgression = async (req, res) => {
    try {
        const utilisateurId = req.utilisateur?.id;

        if (!utilisateurId) {
            return res.status(401).json({ message: "Utilisateur non authentifié." });
        }

        const [utilisateurs] = await pool.query(
            "SELECT niveau FROM utilisateurs WHERE id = ?",
            [utilisateurId]
        );

        const niveau = utilisateurs[0]?.niveau || "A1";

        res.json({
            niveau,
            statistiques: {
                vocabulaire: 80,
                grammaire: 65,
                comprehension: 72,
                expression: 58,
                conversation: 48,
                exercices: 14,
                tauxReussite: 82,
                tempsApprentissage: "4h 20m"
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération de la progression." });
    }
};

module.exports = {
    obtenirUtilisateurs,
    obtenirProfil,
    mettreAJourProfil,
    obtenirProgression
};