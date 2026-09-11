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

module.exports = {
    obtenirUtilisateurs
};