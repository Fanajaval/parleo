import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { inscrireUtilisateur } from "../services/api";

function Inscription() {
    const navigate = useNavigate();
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [message, setMessage] = useState("");
    const [erreur, setErreur] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        setErreur("");

        try {
            const data = await inscrireUtilisateur({
                nom,
                email,
                mot_de_passe: motDePasse,
            });

            setMessage(data.message);
            setNom("");
            setEmail("");
            setMotDePasse("");
            setTimeout(() => navigate("/connexion"), 800);
        } catch (error) {
            setErreur(error.message);
        }
    };

    return (
        <main className="auth-shell">
            <div className="auth-card">
                <p className="eyebrow">Nouveau</p>
                <h1>Créer un compte</h1>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="field-group">
                        <label htmlFor="nom">Nom</label>
                        <input
                            id="nom"
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            placeholder="Jean Dupont"
                        />
                    </div>

                    <div className="field-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="prenom@email.com"
                        />
                    </div>

                    <div className="field-group">
                        <label htmlFor="motDePasse">Mot de passe</label>
                        <input
                            id="motDePasse"
                            type="password"
                            value={motDePasse}
                            onChange={(e) => setMotDePasse(e.target.value)}
                            placeholder="Minimum 8 caractères"
                        />
                    </div>

                    <button type="submit" className="primary-button full-width">
                        S'inscrire
                    </button>
                </form>

                <p className="auth-switch">
                    Vous avez déjà un compte ? <Link to="/connexion">Se connecter</Link>
                </p>

                {message && <p className="success-message">{message}</p>}
                {erreur && <p className="error-message">{erreur}</p>}
            </div>
        </main>
    );
}

export default Inscription;