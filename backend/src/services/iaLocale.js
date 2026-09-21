const reglesGrammaire = [
    { pattern: /mappelle/gi, correction: "m'appelle", explication: "il faut une apostrophe" },
    { pattern: /m appelle/gi, correction: "m'appelle", explication: "utilisez une apostrophe au lieu d'un espace" },
    { pattern: /etudiant/gi, correction: "étudiant", explication: "ajoutez un accent sur le 'e'" },
    { pattern: /francais/gi, correction: "français", explication: "n'oubliez pas la cédille" },
    { pattern: /\bje suis (\w+) et je suis\b/gi, correction: "je suis $1 et je", explication: "évitez la répétition de 'je suis'" },
    { pattern: /apprendre a moi/gi, correction: "apprendre", explication: "'à moi' est incorrect ici" },
    { pattern: /de la français/gi, correction: "le français", explication: "on dit 'le français', pas 'la français'" },
    { pattern: /qu'est-ce qu'on doit continuer/gi, correction: "que devons-nous faire", explication: "formulation plus naturelle" },
    { pattern: /\bje m'appele\b/gi, correction: "je m'appelle", explication: "deux 'l' pour 'appelle'" },
    { pattern: /\bje m'apple\b/gi, correction: "je m'appelle", explication: "deux 'l' et 'e' pour 'appelle'" },
    { pattern: /\bje veus\b/gi, correction: "je veux", explication: "'veux' prend un 'x' à la fin" },
    { pattern: /\bje peu\b/gi, correction: "je peux", explication: "'peux' prend un 'x' à la fin" },
    { pattern: /\bje fait\b/gi, correction: "je fais", explication: "première personne : 'je fais'" },
    { pattern: /\bje vas\b/gi, correction: "je vais", explication: "première personne : 'je vais'" },
    { pattern: /\bje fais du français\b/gi, correction: "j'apprends le français", explication: "plus naturel" }
];

const reponsesContextuelles = [
    {
        mots: ["bonjour", "salut", "coucou", "hello"],
        reponses: [
            "Bonjour ! Comment allez-vous aujourd'hui ?",
            "Salut ! Ravi de vous voir. Comment puis-je vous aider ?",
            "Bonjour ! Prêt à pratiquer votre français ?"
        ]
    },
    {
        mots: ["je m'appelle", "mon nom", "je suis"],
        reponses: [
            "Enchanté ! C'est un plaisir de faire votre connaissance.",
            "Ravi de vous rencontrer ! Quelle est votre profession ?",
            "Très bien ! Parlez-moi un peu de vous."
        ]
    },
    {
        mots: ["étudiant", "étudie", "université", "école"],
        reponses: [
            "Excellent ! Qu'étudiez-vous exactement ?",
            "Les études, c'est important. Dans quel domaine ?",
            "Très bien ! Et depuis combien de temps étudiez-vous le français ?"
        ]
    },
    {
        mots: ["apprendre", "français", "langue", "parler"],
        reponses: [
            "C'est une excellente décision ! Le français est une belle langue.",
            "Bravo pour votre motivation ! Pratiquons ensemble.",
            "Très bien ! La pratique régulière est la clé du succès."
        ]
    },
    {
        mots: ["travail", "métier", "profession", "emploi"],
        reponses: [
            "Intéressant ! Quel type de travail faites-vous ?",
            "Le travail, c'est important. Vous aimez votre métier ?",
            "Très bien ! Parlez-moi de votre profession."
        ]
    },
    {
        mots: ["continuer", "suite", "après", "ensuite"],
        reponses: [
            "Très bien ! Parlons maintenant de vos loisirs ou de votre famille.",
            "D'accord ! Racontez-moi votre journée typique.",
            "Parfait ! Qu'aimez-vous faire pendant votre temps libre ?"
        ]
    },
    {
        mots: ["merci", "remercie"],
        reponses: [
            "De rien ! C'est un plaisir de vous aider.",
            "Avec plaisir ! Continuez comme ça.",
            "Je vous en prie ! Vous faites de beaux progrès."
        ]
    },
    {
        mots: ["au revoir", "bye", "salut", "à bientôt"],
        reponses: [
            "Au revoir ! À bientôt pour une nouvelle session.",
            "Bonne journée ! Continuez à pratiquer.",
            "À la prochaine ! Bon courage dans votre apprentissage."
        ]
    }
];

function corrigerPhrase(texte) {
    let correction = texte;
    let erreursDetectees = [];

    reglesGrammaire.forEach(regle => {
        if (regle.pattern.test(correction)) {
            erreursDetectees.push(regle.explication);
            correction = correction.replace(regle.pattern, regle.correction);
        }
    });

    return {
        correction: correction.trim(),
        erreursDetectees,
        aDesErreurs: erreursDetectees.length > 0
    };
}

function genererReponse(texteOriginal, correction, erreursDetectees, historique = []) {
    const texte = texteOriginal.toLowerCase();
    let reponse = "";

    if (erreursDetectees.length > 0) {
        const premiereErreur = erreursDetectees[0];
        reponse = `Petite correction : ${premiereErreur}. `;
        
        if (correction !== texteOriginal) {
            reponse += `On dit plutôt : "${correction}". `;
        }
    } else {
        const encouragements = [
            "Très bien ! ",
            "Excellent ! ",
            "Parfait ! ",
            "C'est bien ! ",
            "Bravo ! "
        ];
        reponse = encouragements[Math.floor(Math.random() * encouragements.length)];
    }

    let reponseContextuelle = null;
    for (const contexte of reponsesContextuelles) {
        if (contexte.mots.some(mot => texte.includes(mot))) {
            const reponses = contexte.reponses;
            reponseContextuelle = reponses[Math.floor(Math.random() * reponses.length)];
            break;
        }
    }

    if (reponseContextuelle) {
        reponse += reponseContextuelle;
    } else {
        const reponsesDefaut = [
            "Continuez à pratiquer, vous faites des progrès !",
            "Parlez-moi encore un peu de vous.",
            "Très bien. Que voulez-vous me dire d'autre ?",
            "Intéressant ! Développez votre idée.",
            "C'est une bonne phrase. Essayez d'ajouter plus de détails."
        ];
        reponse += reponsesDefaut[Math.floor(Math.random() * reponsesDefaut.length)];
    }

    return reponse.trim();
}

function traiterMessage(message, historique = []) {
    const texte = String(message || "").replace(/\s+/g, " ").trim();
    
    if (!texte) {
        return {
            correction: "",
            reponse: "Je n'ai pas compris. Pouvez-vous répéter ?",
            erreurs: []
        };
    }

    const resultat = corrigerPhrase(texte);
    const reponse = genererReponse(texte, resultat.correction, resultat.erreursDetectees, historique);

    return {
        correction: resultat.correction,
        reponse,
        erreurs: resultat.erreursDetectees,
        aDesErreurs: resultat.aDesErreurs
    };
}

module.exports = {
    corrigerPhrase,
    genererReponse,
    traiterMessage
};
