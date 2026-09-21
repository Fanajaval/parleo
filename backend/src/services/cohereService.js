const axios = require("axios");

const COHERE_API_KEY = (process.env.COHERE_API_KEY || "").trim();
const COHERE_MODEL = process.env.COHERE_MODEL || "command-r";

async function interrogerCohere(texteUtilisateur, historique = []) {
    if (!COHERE_API_KEY) {
        console.warn("Clé COHERE_API_KEY manquante");
        return null;
    }

    try {
        const prompt = `Tu es un professeur de français patient et encourageant.

Contexte de conversation précédent :
${historique.slice(-4).map(h => `${h.role === 'utilisateur' ? 'Apprenant' : 'Professeur'}: ${h.texte}`).join('\n')}

Apprenant : ${texteUtilisateur}

Instructions :
- Réponds en français
- Corrige gentiment les erreurs s'il y en a
- Encourage l'apprenant
- Pose une question pour continuer
- Sois concis (2-3 phrases)

Professeur :`;

        console.log("Envoi de la requête à Cohere...");

        const response = await axios.post(
            "https://api.cohere.ai/v1/generate",
            {
                model: COHERE_MODEL,
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7,
                stop_sequences: ["\nApprenant:", "\n\n"]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${COHERE_API_KEY}`
                },
                timeout: 15000
            }
        );

        const reponse = response.data.generations[0]?.text || "";
        console.log("Réponse Cohere reçue:", reponse.substring(0, 100));
        
        return reponse.trim();

    } catch (error) {
        console.error("Erreur Cohere:");
        if (error.response) {
            console.error("Statut:", error.response.status);
            console.error("Message:", error.response.data?.message || error.response.data);
        } else {
            console.error("Message:", error.message);
        }
        return null;
    }
}

module.exports = {
    interrogerCohere
};
