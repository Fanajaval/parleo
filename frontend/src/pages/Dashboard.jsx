import { useEffect, useState } from "react";
import { getMonProfil, getProgression } from "../services/api";

function Dashboard() {
    const [utilisateur, setUtilisateur] = useState(null);
    const [progression, setProgression] = useState(null);

    useEffect(() => {
        const chargerDonnees = async () => {
            try {
                const [profil, stats] = await Promise.all([
                    getMonProfil(),
                    getProgression()
                ]);

                setUtilisateur(profil);
                setProgression(stats);
                localStorage.setItem("utilisateur", JSON.stringify(profil));
            } catch (error) {
                console.error(error);
            }
        };

        chargerDonnees();
    }, []);

    if (!utilisateur || !progression) {
        return <main className="page-shell"><p>Chargement du tableau de bord...</p></main>;
    }

    const statistiques = [
        { label: "Vocabulaire", value: progression.statistiques.vocabulaire },
        { label: "Grammaire", value: progression.statistiques.grammaire },
        { label: "Compréhension", value: progression.statistiques.comprehension },
        { label: "Expression", value: progression.statistiques.expression },
        { label: "Conversation", value: progression.statistiques.conversation }
    ];

    return (
        <main className="page-shell dashboard-shell">
            <section className="welcome-panel">
                <div>
                    <p className="eyebrow">Tableau de bord</p>
                    <h1>Bonjour {utilisateur.nom}</h1>
                    <p className="lead">Votre niveau actuel : {progression.niveau}</p>
                </div>
                <div className="score-card">
                    <span>Progression</span>
                    <strong>{progression.statistiques.tauxReussite}%</strong>
                </div>
            </section>

            <section className="cards-grid">
                {statistiques.map((item) => (
                    <article key={item.label} className="info-card">
                        <div className="card-topline">
                            <span>{item.label}</span>
                            <span>{item.value}%</span>
                        </div>
                        <div className="progress-bar">
                            <span style={{ width: `${item.value}%` }} />
                        </div>
                    </article>
                ))}
            </section>

            <section className="activity-grid">
                <div className="info-card">
                    <h3>Activités récentes</h3>
                    <ul className="activity-list">
                        <li>Vocabulaire : Les salutations</li>
                        <li>Grammaire : Le présent</li>
                        <li>Conversation : Se présenter</li>
                    </ul>
                </div>

                <div className="info-card">
                    <h3>Accès rapide</h3>
                    <div className="quick-links">
                        <button type="button" className="secondary-button small-button">Apprendre</button>
                        <button type="button" className="secondary-button small-button">Pratiquer</button>
                        <button type="button" className="secondary-button small-button">Conversation IA</button>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Dashboard;