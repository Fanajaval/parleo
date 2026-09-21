import { Link } from "react-router-dom";

function Accueil() {
    return (
        <main className="page-shell accueil-shell">
            <section className="hero-card">
                <div>
                    <p className="eyebrow">Parléo</p>
                    <h1>Apprenez le français avec pratique, confiance et progression.</h1>
                    <p className="lead">
                        Une plateforme pensée pour pratiquer la langue au quotidien : vocabulaire,
                        grammaire, exercices, conversations guidées et suivi personnalisé.
                    </p>
                    <div className="hero-actions">
                        <Link to="/inscription" className="primary-button">Créer un compte</Link>
                        <Link to="/connexion" className="secondary-button">Se connecter</Link>
                    </div>
                </div>
                <div className="hero-panel">
                    <div className="level-badge">Niveau A1</div>
                    <div className="mini-stat">
                        <strong>80%</strong>
                        <span>Progression</span>
                    </div>
                    <ul>
                        <li>Vocabulaire : Les salutations</li>
                        <li>Grammaire : Le présent</li>
                        <li>Conversation : Se présenter</li>
                    </ul>
                </div>
            </section>

            <section className="features-grid">
                <article className="feature-card">
                    <span className="feature-tag">Objectif</span>
                    <h3>Progression claire</h3>
                    <p>Progression adaptée au niveau de chaque apprenant.</p>
                </article>
                <article className="feature-card">
                    <span className="feature-tag">Conversation</span>
                    <h3>Dialogue IA</h3>
                    <p>Pratique orale guidée et corrections constructives.</p>
                </article>
                <article className="feature-card">
                    <span className="feature-tag">Exercices</span>
                    <h3>Apprentissage</h3>
                    <p>Vocabulaire, grammaire et compréhension en ligne.</p>
                </article>
            </section>
        </main>
    );
}

export default Accueil;
