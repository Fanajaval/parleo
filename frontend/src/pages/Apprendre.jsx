import { useEffect, useState } from "react";
import { getLecons } from "../services/api";

function Apprendre() {
    const [lecons, setLecons] = useState([]);
    const [erreur, setErreur] = useState("");

    useEffect(() => {
        const chargerLecons = async () => {
            try {
                const donnees = await getLecons();
                setLecons(donnees);
            } catch (error) {
                setErreur(error.message);
            }
        };

        chargerLecons();
    }, []);

    return (
        <main className="page-shell">
            <section className="section-header">
                <div>
                    <p className="eyebrow">Apprendre</p>
                    <h1>Leçons et vocabulaire</h1>
                </div>
            </section>

            {erreur && <p className="error-message">{erreur}</p>}

            <div className="cards-grid two-columns">
                {lecons.map((lecon) => (
                    <article key={lecon.id} className="info-card">
                        <div className="card-topline">
                            <span className="pill">{lecon.niveau}</span>
                            <span className="muted">{lecon.theme}</span>
                        </div>

                        <h3>{lecon.titre}</h3>
                        <p>{lecon.objectif}</p>

                        <div className="lesson-list">
                            <h4>Vocabulaire</h4>
                            <ul>
                                {lecon.vocabulaire.map((mot) => (
                                    <li key={mot.mot}>
                                        <strong>{mot.mot}</strong> — {mot.traduction}
                                        <br />
                                        <span>{mot.exemple}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lesson-rule">
                            <strong>Grammaire :</strong>
                            <p>{lecon.grammaire}</p>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}

export default Apprendre;
