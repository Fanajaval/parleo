import { useState } from "react";
import { connecterUtilisateur } from "../services/api";

function Connexion() {
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

            //test
            localStorage.setItem("token", data.token);

            setMessage(data.message);

            console.log("Utilisateur connecté :", data.utilisateur);
        } catch (error) {
            setErreur(error.message);
        }
    };

    return (
        <div>
            <h1>Connexion</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                    />
                </div>

                <button type="submit">
                    Se connecter
                </button>
            </form>

            {message && <p>{message}</p>}
            {erreur && <p>{erreur}</p>}
        </div>
    );
}

export default Connexion;