import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connecterUtilisateur } from "../services/api";

function Connexion() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [message, setMessage] = useState("");
    const [erreur, setErreur] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        setErreur("");

        try {
            const data = await connecterUtilisateur({
                email,
                mot_de_passe: motDePasse,
            });

            localStorage.setItem("token", data.token);
            localStorage.setItem("utilisateur", JSON.stringify(data.utilisateur));
            setMessage(data.message);
            navigate("/dashboard");
        } catch (error) {
            setErreur(error.message);
        }
    };

    return (
        <main className="auth-shell">
            <div className="auth-card">
                <p className="eyebrow">Bienvenue</p>
                <h1>Connexion</h1>

                <form onSubmit={handleSubmit} className="auth-form">
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
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="primary-button full-width">
                        Se connecter
                    </button>
                </form>

                <p className="auth-switch">
                    Pas encore de compte ? <Link to="/inscription">Créer un compte</Link>
                </p>

                {message && <p className="success-message">{message}</p>}
                {erreur && <p className="error-message">{erreur}</p>}
            </div>
        </main>
    );
}

export default Connexion;