import { useEffect, useState } from "react";
import { getExercices } from "../services/api";

function Exercices() {
    const [exercices, setExercices] = useState([]);
    const [exerciceActif, setExerciceActif] = useState(0);
    const [reponseSelectionnee, setReponseSelectionnee] = useState("");
    const [score, setScore] = useState(0);
    const [resultat, setResultat] = useState("");
    const [erreur, setErreur] = useState("");

    useEffect(() => {
        const chargerExercices = async () => {
            try {
                const donnees = await getExercices();
                setExercices(donnees);
            } catch (error) {
                setErreur(error.message);
            }
        };

        chargerExercices();
    }, []);

    const exercice = exercices[exerciceActif];

    const validerReponse = () => {
        if (!exercice || !reponseSelectionnee) {
            return;
        }

        if (reponseSelectionnee === exercice.reponseCorrecte) {
            setScore((valeur) => valeur + 1);
            setResultat(`Bonne réponse ! ${exercice.explication}`);
        } else {
            setResultat(`Pas encore. ${exercice.explication}`);
        }
    };

    const suivant = () => {
        if (exerciceActif < exercices.length - 1) {
            setExerciceActif((index) => index + 1);
            setReponseSelectionnee("");
            setResultat("");
            return;
        }

        setResultat(`Fin du quiz. Votre score est de ${score}/${exercices.length}.`);
    };

    if (!exercice) {
        return (
            <main className="page-shell">
                <p>Chargement des exercices...</p>
                {erreur && <p className="error-message">{erreur}</p>}
            </main>
        );
    }

    return (
        <main className="page-shell">
            <section className="section-header">
                <div>
                    <p className="eyebrow">Pratiquer</p>
                    <h1>Exercices</h1>
                </div>
            </section>

            <div className="quiz-card info-card">
                <div className="card-topline">
                    <span className="pill">{exercice.theme}</span>
                    <span className="muted">Question {exerciceActif + 1}/{exercices.length}</span>
                </div>

                <h3>{exercice.question}</h3>

                <div className="quiz-options">
                    {exercice.options.map((option) => (
                        <label key={option} className="option-item">
                            <input
                                type="radio"
                                name="reponse"
                                value={option}
                                checked={reponseSelectionnee === option}
                                onChange={(event) => setReponseSelectionnee(event.target.value)}
                            />
                            <span>{option}</span>
                        </label>
                    ))}
                </div>

                <div className="quiz-actions">
                    <button type="button" className="primary-button small-button" onClick={validerReponse}>
                        Valider
                    </button>
                    <button type="button" className="secondary-button small-button" onClick={suivant}>
                        Suivant
                    </button>
                </div>

                {resultat && <p className="result-message">{resultat}</p>}
            </div>
        </main>
    );
}

export default Exercices;
