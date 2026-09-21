import { useEffect, useRef, useState } from "react";

function Conversation() {
    const [messages, setMessages] = useState([]);
    const [nouveauMessage, setNouveauMessage] = useState("");
    const [chargement, setChargement] = useState(false);
    const [ecouteVocale, setEcouteVocale] = useState(false);
    const [statutMicro, setStatutMicro] = useState("Dictée vocale disponible");
    const recognitionRef = useRef(null);

    const parler = (texte) => {
        if (!texte || !("speechSynthesis" in window)) {
            return;
        }

        window.speechSynthesis.cancel();
        const message = new SpeechSynthesisUtterance(texte);
        message.lang = "fr-FR";
        message.rate = 0.95;
        message.pitch = 1.1;
        message.volume = 1;
        window.speechSynthesis.speak(message);
    };

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setStatutMicro("Le micro n'est pas pris en charge par ce navigateur.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "fr-FR";
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setEcouteVocale(true);
            setStatutMicro("Je vous écoute...");
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setNouveauMessage(transcript);
        };

        recognition.onend = () => {
            setEcouteVocale(false);
            setStatutMicro("Dictée vocale disponible");
        };

        recognition.onerror = () => {
            setEcouteVocale(false);
            setStatutMicro("Le micro n’a pas pu comprendre votre phrase.");
        };

        recognitionRef.current = recognition;

        return () => {
            recognition.stop();
            window.speechSynthesis?.cancel();
        };
    }, []);

    const activerMicro = () => {
        if (!recognitionRef.current) {
            setStatutMicro("Le navigateur ne supporte pas la dictée vocale.");
            return;
        }

        if (ecouteVocale) {
            recognitionRef.current.stop();
            return;
        }

        recognitionRef.current.start();
    };

    const envoyerMessage = async (event) => {
        event.preventDefault();

        const texteUtilisateur = nouveauMessage.trim();
        if (!texteUtilisateur || chargement) {
            return;
        }

        setMessages((messagesActuels) => [
            ...messagesActuels,
            { role: "utilisateur", texte: texteUtilisateur }
        ]);
        setNouveauMessage("");
        setChargement(true);

        try {
            const historique = [...messages, { role: "utilisateur", texte: texteUtilisateur }];
            const response = await fetch("http://localhost:5000/api/conversation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: texteUtilisateur, history: historique })
            });

            const donnees = await response.json();

            if (!response.ok) {
                throw new Error(donnees.message || "Une erreur est survenue.");
            }

            const reponseIa = donnees.reponse || "Très bien ! Continuez comme ça.";

            setMessages((messagesActuels) => [
                ...messagesActuels,
                { role: "ia", texte: reponseIa }
            ]);

            parler(donnees.audioText || reponseIa);
        } catch (erreur) {
            const messageErreur = "Je n’ai pas pu corriger votre phrase. Réessayez avec une phrase plus simple.";
            setMessages((messagesActuels) => [
                ...messagesActuels,
                { role: "ia", texte: messageErreur }
            ]);
            parler(messageErreur);
        } finally {
            setChargement(false);
        }
    };

    return (
        <main className="page-shell">
            <section className="section-header">
                <div>
                    <p className="eyebrow">Conversation IA</p>
                    <h1>Pratiquer le français</h1>
                </div>
            </section>

            <div className="chat-panel">
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={message.role === "ia" ? "bubble ia" : "bubble user"}
                        >
                            <strong>{message.role === "ia" ? "IA" : "Vous"}</strong>
                            <p>{message.texte}</p>
                        </div>
                    ))}
                </div>

                <div className="voice-controls">
                    <button
                        type="button"
                        className={`voice-button ${ecouteVocale ? "active" : ""}`}
                        onClick={activerMicro}
                    >
                        {ecouteVocale ? "Arrêter le micro" : "Utiliser le micro"}
                    </button>
                    <button
                        type="button"
                        className="voice-button"
                        onClick={() => parler(messages[messages.length - 1]?.texte || "")}
                    >
                        Écouter la réponse
                    </button>
                    <span className="voice-status">{statutMicro}</span>
                </div>

                <form className="chat-form" onSubmit={envoyerMessage}>
                    <input
                        type="text"
                        value={nouveauMessage}
                        onChange={(event) => setNouveauMessage(event.target.value)}
                        placeholder="Écrivez votre message en français..."
                        disabled={chargement}
                    />
                    <button type="submit" className="primary-button small-button" disabled={chargement}>
                        {chargement ? "En cours..." : "Envoyer"}
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Conversation;
