const express = require("express");

const router = express.Router();

const normaliserTexte = (message) => String(message || "").replace(/\s+/g, " ").trim();

const corrigerPhrase = (message) => {
    const texte = normaliserTexte(message);

    if (!texte) {
        return "";
    }

    let correction = texte;
    const remplacements = [
        [/mappelle/gi, "m'appelle"],
        [/m appelle/gi, "m'appelle"],
        [/etudiant/gi, "étudiant"],
        [/je mappelle/gi, "je m'appelle"],
        [/je suis etudiant/gi, "je suis étudiant"],
        [/je suis etudiant\./gi, "je suis étudiant."],
        [/je mappelle\./gi, "je m'appelle."],
        [/apprendre a moi/gi, "apprendre le français"],
        [/a moi/gi, "à moi"],
        [/de la français/gi, "le français"],
        [/qu'est-ce qu'on doit continuer alors/gi, "que faut-il faire ensuite"],
        [/\s+/g, " "]
    ];

    remplacements.forEach(([pattern, remplacement]) => {
        correction = correction.replace(pattern, remplacement);
    });

    return correction;
};

const construireSuite = (texte, historique = []) => {
    const contenu = String(texte || "").toLowerCase();
    const historiqueTexte = historique.map((item) => String(item?.texte || "")).join(" ").toLowerCase();

    if (contenu.includes("continuer") || contenu.includes("suite") || historiqueTexte.includes("continuer") || historiqueTexte.includes("suite")) {
        return "On continue avec une phrase simple et complète. Par exemple : Nous continuons notre exercice de français aujourd'hui.";
    }

    if (contenu.includes("apprendre") || contenu.includes("français")) {
        return "Pour parler correctement, on peut dire : J'apprends le français et je pratique chaque jour.";
    }

    if (contenu.includes("bonjour") || contenu.includes("salut")) {
        return "Bonjour ! Vous pouvez aussi dire : Bonjour, je m'appelle Karim et je veux améliorer mon français.";
    }

    if (contenu.includes("je m'appelle") || contenu.includes("je suis")) {
        return "Très bien. Ajoutez maintenant un détail de votre vie pour parler avec plus de précision.";
    }

    if (contenu.includes("étudiant") || contenu.includes("travail") || contenu.includes("famille")) {
        return "Parfait. Essayez maintenant une phrase complète avec un sujet, un verbe et un détail.";
    }

    return "Continuez avec une phrase courte, claire et naturelle. Un détail supplémentaire rendra votre français plus vivant.";
};

router.post("/conversation", (req, res) => {
    const { message, history = [] } = req.body || {};
    const texte = normaliserTexte(message);

    if (!texte) {
        return res.status(400).json({
            message: "Le message est requis pour corriger une phrase."
        });
    }

    const correction = corrigerPhrase(texte);
    const erreur = correction !== texte;
    const suite = construireSuite(correction, history);

    const reponse = erreur
        ? `Très bien ! La version correcte est : « ${correction} ». ${suite}`
        : `Très bien ! Votre phrase est naturelle, mais on peut la renforcer encore. ${suite}`;

    const audioText = erreur
        ? `Très bien ! La version correcte est : ${correction}. ${suite}`
        : `Très bien ! Votre phrase est naturelle, mais on peut la renforcer encore. ${suite}`;

    return res.json({
        message: texte,
        correction,
        reponse,
        audioText,
        erreur
    });
});

module.exports = router;
