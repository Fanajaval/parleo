import { useEffect, useState } from "react";
import { getMonProfil, mettreAJourProfil } from "../services/api";

function Profil() {
    const [utilisateur, setUtilisateur] = useState(null);
    const [nom, setNom] = useState("");
    const [niveau, setNiveau] = useState("A1");
    const [message, setMessage] = useState("");
    const [erreur, setErreur] = useState("");

    useEffect(() => {
        const chargerProfil = async () => {
            try {
                const data = await getMonProfil();
                setUtilisateur(data);
                setNom(data.nom || "");
                setNiveau(data.niveau || "A1");
            } catch (error) {
                setErreur(error.message);
            }
        };

        chargerProfil();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        setErreur("");

        try {
            const data = await mettreAJourProfil({ nom, niveau });
            setUtilisateur(data.utilisateur);
            setMessage(data.message);
            localStorage.setItem("utilisateur", JSON.stringify(data.utilisateur));
        } catch (error) {
            setErreur(error.message);
        }
    };

    if (!utilisateur) {
        return <main className="page-shell"><p>Chargement du profil...</p></main>;
    }

    return (
        <main className="page-shell">
            <section className="section-header">
                <div>
                    <p className="eyebrow">Profil</p>
                    <h1>Mon profil</h1>
                </div>
            </section>

            <form className="form-card" onSubmit={handleSubmit}>
                <div className="field-group">
                    <label htmlFor="nom">Nom</label>
                    <input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} />
                </div>

                <div className="field-group">
                    <label htmlFor="niveau">Niveau de français</label>
                    <select id="niveau" value={niveau} onChange={(e) => setNiveau(e.target.value)}>
                        <option value="A1">A1</option>
                        <option value="A2">A2</option>
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C1">C1</option>
                        <option value="C2">C2</option>
                    </select>
                </div>

                <div className="profile-summary">
                    <strong>Email :</strong> {utilisateur.email}
                </div>

                <button type="submit" className="primary-button">Enregistrer</button>
            </form>

            {message && <p className="success-message">{message}</p>}
            {erreur && <p className="error-message">{erreur}</p>}
        </main>
    );
}

export default Profil;
