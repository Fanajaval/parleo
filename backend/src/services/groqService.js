const axios = require("axios");

const GROQ_API_KEY = (process.env.GROQ_API_KEY || "").trim();
const GROQ_MODEL = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

async function interrogerGroq(texteUtilisateur, historique = []) {
    if (!GROQ_API_KEY) {
        console.warn("Clé GROQ_API_KEY manquante");
        return null;
    }

    try {
        const messages = [
            {
                role: "system",
                content: `Tu es un professeur de français patient et encourageant. Tu aides les apprenants à améliorer leur français.

Règles importantes :
- Réponds TOUJOURS en français
- Si la phrase a des erreurs, corrige-les gentiment
- Explique la correction en une phrase simple
- Encourage l'apprenant
- Pose une question pour continuer la conversation
- Sois concis (2-3 phrases maximum)
- Ne donne jamais de réponse en anglais

Exemple :
Apprenant: "Je mappelle Marie"
Toi: "Petite correction : il faut écrire 'je m'appelle' avec une apostrophe. Enchanté Marie ! Que fais-tu dans la vie ?"

Apprenant: "Je suis etudiant"
Toi: "Très bien ! (Note : 'étudiant' prend un accent sur le e). Qu'études-tu ?"
`
            }
        ];

        const historiqueRecent = historique.slice(-6);
        historiqueRecent.forEach(item => {
            messages.push({
                role: item.role === "utilisateur" ? "user" : "assistant",
                content: item.texte
            });
        });

        messages.push({
            role: "user",
            content: texteUtilisateur
        });

        console.log("Envoi de la requête à Groq...");

        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: GROQ_MODEL,
                messages: messages,
                temperature: 0.7,
                max_tokens: 200,
                top_p: 0.9
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${GROQ_API_KEY}`
                },
                timeout: 15000
            }
        );

        const reponse = response.data.choices[0]?.message?.content || "";
        console.log("Réponse Groq reçue:", reponse.substring(0, 100));
        
        return reponse.trim();

    } catch (error) {
        console.error("Erreur Groq:");
        if (error.response) {
            console.error("Statut:", error.response.status);
            console.error("Message:", error.response.data?.error?.message || error.response.data);
        } else {
            console.error("Message:", error.message);
        }
        return null;
    }
}

module.exports = {
    interrogerGroq
};
