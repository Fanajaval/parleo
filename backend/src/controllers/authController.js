const bcrypt = require("bcryptjs");
const pool = require("../config/database");
const jwt = require("jsonwebtoken");

const inscrire = async (req, res) => {
    try {
        const { nom, email, mot_de_passe } = req.body;

        //verif champ obligatoire
        if (!nom || !email || !mot_de_passe) {
            return res.status(400).json({
                message: "Tous les champs sont obligatoires."
            });
        }

        //verif email si existe deja
        const [utilisateurs] = await pool.query(
            "SELECT id FROM utilisateurs WHERE email = ?",
            [email]
        );

        if (utilisateurs.length > 0) {
            return res.status(409).json({
                message: "Cette adresse email est déjà utilisée."
            });
        }

        //hackage mdp
        const motDePasseHache = await bcrypt.hash(mot_de_passe, 10);
        

        const [resultat] = await pool.query(
            `INSERT INTO utilisateurs
            (nom, email, mot_de_passe)
            VALUES (?, ?, ?)`,
            [nom, email, motDePasseHache]
        );

        res.status(201).json({
            message: "Utilisateur créé avec succès.",
            utilisateur: {
                id: resultat.insertId,
                nom,
                email
            }
        });

    } catch (error) {
        console.error("Erreur inscription :", error);

        res.status(500).json({
            message: "Erreur interne du serveur."
        });
    }
};

const connecter = async (req, res) => {
    try {
        const { email, mot_de_passe } = req.body;

        if (!email || !mot_de_passe) {
            return res.status(400).json({
                message: "L'email et le mot de passe sont obligatoires."
            });
        }

        //recherche par mail
        const [utilisateurs] = await pool.query(
            "SELECT * FROM utilisateurs WHERE email = ?",
            [email]
        );

        if (utilisateurs.length === 0) {
            return res.status(401).json({
                message: "Email ou mot de passe incorrect."
            });
        }

        const utilisateur = utilisateurs[0];

        //verif mdp
        const motDePasseCorrect = await bcrypt.compare(
            mot_de_passe,
            utilisateur.mot_de_passe
        );

        if (!motDePasseCorrect) {
            return res.status(401).json({
                message: "Email ou mot de passe incorrect."
            });
        }

        //token
        const token = jwt.sign(
            {
                id: utilisateur.id,
                email: utilisateur.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            message: "Connexion réussie.",
            token,
            utilisateur: {
                id: utilisateur.id,
                nom: utilisateur.nom,
                email: utilisateur.email,
                niveau: utilisateur.niveau
            }
        });

    } catch (error) {
        console.error("Erreur connexion :", error);

        res.status(500).json({
            message: "Erreur interne du serveur."
        });
    }
};

module.exports = {
    inscrire,
    connecter
};