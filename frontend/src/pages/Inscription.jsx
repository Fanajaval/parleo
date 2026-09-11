import { useState } from "react";
import { inscrireUtilisateur } from "../services/api";

function Inscription() {
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
        } catch (error) {
            setErreur(error.message);
        }
    };

    return (
        <div>
            <h1>Créer un compte</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                </div>

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
                    S'inscrire
                </button>
            </form>

            {message && <p>{message}</p>}
            {erreur && <p>{erreur}</p>}
        </div>
    );
}

export default Inscription;