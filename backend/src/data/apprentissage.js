const lecons = [
  {
    id: "salutations",
    titre: "Les salutations",
    niveau: "A1",
    theme: "Présentation",
    objectif: "Savoir saluer et se présenter en français.",
    vocabulaire: [
      { mot: "Bonjour", traduction: "Hello", exemple: "Bonjour ! Je m'appelle Claire." },
      { mot: "Bonsoir", traduction: "Good evening", exemple: "Bonsoir, comment ça va ?" },
      { mot: "Merci", traduction: "Thank you", exemple: "Merci beaucoup pour votre aide." },
      { mot: "Au revoir", traduction: "Goodbye", exemple: "Au revoir, à demain !" }
    ],
    grammaire: "On utilise le présent pour parler de habitudes et de faits du quotidien."
  },
  {
    id: "present",
    titre: "Le présent",
    niveau: "A1",
    theme: "Grammaire",
    objectif: "Maîtriser les verbes au présent dans des phrases simples.",
    vocabulaire: [
      { mot: "je mange", traduction: "I eat", exemple: "Je mange une pomme." },
      { mot: "tu parles", traduction: "you speak", exemple: "Tu parles très bien." },
      { mot: "nous allons", traduction: "we go", exemple: "Nous allons à l'école." }
    ],
    grammaire: "Les verbes du premier groupe se terminent souvent par -er au présent : je parle, tu parles, il parle."
  },
  {
    id: "travail",
    titre: "Le travail et les études",
    niveau: "A2",
    theme: "Vie quotidienne",
    objectif: "Parler de son travail, de ses études et de ses projets.",
    vocabulaire: [
      { mot: "étudiant", traduction: "student", exemple: "Je suis étudiant en informatique." },
      { mot: "travail", traduction: "work", exemple: "Mon travail commence à 9 heures." },
      { mot: "cours", traduction: "class", exemple: "Les cours commencent demain." }
    ],
    grammaire: "On peut utiliser le verbe être pour parler de son état ou de son métier : Je suis professeur, je suis étudiant."
  }
];

const exercices = [
  {
    id: "ex1",
    type: "choix_multiple",
    theme: "Vocabulaire",
    question: "Que signifie « Bonjour » ?",
    options: ["Bonsoir", "Bonjour", "Merci", "Au revoir"],
    reponseCorrecte: "Bonjour",
    explication: "« Bonjour » sert à saluer quelqu'un le matin ou à une première rencontre."
  },
  {
    id: "ex2",
    type: "choix_multiple",
    theme: "Grammaire",
    question: "Complétez : Je ___ une pomme.",
    options: ["mange", "manges", "mangons", "mangent"],
    reponseCorrecte: "mange",
    explication: "Avec « je », le verbe se conjugue à la 1re personne du singulier : je mange."
  },
  {
    id: "ex3",
    type: "choix_multiple",
    theme: "Conversation",
    question: "Quelle phrase est correcte pour se présenter ?",
    options: [
      "Je m'appelle Karim et je suis étudiant.",
      "Je suis Karim étudiant.",
      "Je suis au Karim.",
      "Karim m'appelle je."
    ],
    reponseCorrecte: "Je m'appelle Karim et je suis étudiant.",
    explication: "Cette formulation est naturelle et correcte pour présenter son identité et sa situation."
  }
];

module.exports = { lecons, exercices };
