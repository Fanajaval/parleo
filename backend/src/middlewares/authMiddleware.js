const jwt = require("jsonwebtoken");

const verifierToken = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({
                message: "Token d'authentification manquant."
            });
        }

        const parts = authorization.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                message: "Format du token invalide."
            });
        }

        const token = parts[1];

        const utilisateur = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.utilisateur = utilisateur;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token invalide ou expiré."
        });
    }
};

module.exports = verifierToken;