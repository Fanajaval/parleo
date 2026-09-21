const express = require("express");
const axios = require("axios");
const iaLocale = require("../services/iaLocale");
const { interrogerGroq } = require("../services/groqService");
const { interrogerCohere } = require("../services/cohereService");
require("dotenv").config();

const router = express.Router();
const HF_TOKEN = (process.env.HF_TOKEN || "").trim();
const HF_MODEL = process.env.HF_MODEL || "microsoft/Phi-3-mini-4k-instruct";

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

const nettoyerReponseIa = (reponse) => {
    if (!reponse) {
        return "";
    }

    let texte = String(reponse).trim();
    texte = texte.replace(/^\s*(?:Utilisateur|IA|Assistant|Professeur)\s*:\s*/i, "");
    texte = texte.replace(/^\s*(?:Correction|Réponse|Suggestion)\s*[:\-]?\s*/i, "");
    texte = texte.replace(/\n+/g, " ");
    texte = texte.replace(/\s+/g, " ").trim();

    if (texte.length > 500) {
        texte = texte.slice(0, 500).trim();
    }

    return texte;
};

async function questionnerHuggingFace(texte, historique = []) {
    if (!HF_TOKEN) {
        return null;
    }

    const contexte = historique.slice(-6).map((item) => {
        const role = item?.role === "utilisateur" ? "Utilisateur" : "IA";
        return `${role}: ${item?.texte || ""}`;
    }).join("\n");

    const prompt = `Tu es un professeur de français patient, encourageant et précis.
Tu aides un apprenant qui essaie de parler naturellement.

Règles strictes :
- Réponds toujours en français.
- Corrige doucement et simplement les erreurs.
- Explique la correction en une phrase courte.
- Donne ensuite une petite suite utile pour continuer la conversation.
- N'écris pas plus de 2 ou 3 phrases.
- Ne donne pas de texte au format JSON, pas de liste, pas d'explication technique.

Contexte précédent :
${contexte || "Aucun contexte."}

Phrase de l'apprenant : ${texte}

Réponse du professeur :`;

    const response = await axios.post(
        `https://api-inference.huggingface.co/models/${HF_MODEL}`,
        {
            inputs: prompt,
            parameters: {
                max_new_tokens: 160,
                temperature: 0.7,
                top_p: 0.9,
                return_full_text: false
            },
            options: {
                wait_for_model: true
            }
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${HF_TOKEN}`
            },
            timeout: 30000 // 30 secondes
        }
    );

    const data = response.data;
    console.log("Données brutes reçues:", JSON.stringify(data).substring(0, 200));
    const texteReponse = Array.isArray(data)
        ? data[0]?.generated_text || data[0]?.text || ""
        : Array.isArray(data?.generated_text)
            ? data.generated_text[0] || ""
            : typeof data === "string"
                ? data
                : data?.generated_text || data?.text || data?.error || "";

    return nettoyerReponseIa(texteReponse);
}

router.post("/conversation", async (req, res) => {
    const { message, history = [] } = req.body || {};
    const texte = normaliserTexte(message);

    if (!texte) {
        return res.status(400).json({
            message: "Le message est requis pour corriger une phrase."
        });
    }

    let reponseIA = null;
    let serviceUtilise = "aucun";

    try {
        console.log("[1/4] Tentative Groq...");
        reponseIA = await interrogerGroq(texte, history);
        if (reponseIA) {
            serviceUtilise = "groq";
            console.log("Groq utilisé avec succès");
        }
    } catch (error) {
        console.log("Groq non disponible, essai suivant...");
    }

    if (!reponseIA) {
        try {
            console.log("[2/4] Tentative Cohere...");
            reponseIA = await interrogerCohere(texte, history);
            if (reponseIA) {
                serviceUtilise = "cohere";
                console.log("Cohere utilisé avec succès");
            }
        } catch (error) {
            console.log("Cohere non disponible, essai suivant...");
        }
    }

    if (!reponseIA && HF_TOKEN) {
        try {
            console.log("[3/4] Tentative Hugging Face...");
            reponseIA = await questionnerHuggingFace(texte, history);
            if (reponseIA) {
                serviceUtilise = "huggingface";
                console.log("Hugging Face utilisé avec succès");
            }
        } catch (error) {
            console.log("Hugging Face non disponible, essai suivant...");
        }
    }

    if (!reponseIA) {
        console.log("[4/4] Utilisation de l'IA locale");
        const resultat = iaLocale.traiterMessage(texte, history);
        reponseIA = resultat.reponse;
        serviceUtilise = "locale";
        console.log("IA locale utilisée");
    }

    const correction = corrigerPhrase(texte);
    const erreur = correction !== texte;

    const reponse = reponseIA || "Très bien ! Continuez comme ça.";
    const audioText = reponse;

    console.log(`Service utilisé: ${serviceUtilise}`);

    return res.json({
        message: texte,
        correction,
        reponse,
        audioText,
        erreur,
        serviceUtilise
    });
});

module.exports = router;
