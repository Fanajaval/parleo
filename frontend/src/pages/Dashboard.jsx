import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [utilisateur, setUtilisateur] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const utilisateurStocke = localStorage.getItem("utilisateur");

        if (utilisateurStocke) {
            setUtilisateur(JSON.parse(utilisateurStocke));
        }
    }, []);

    const seDeconnecter = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("utilisateur");

        navigate("/connexion");
    };

    if (!utilisateur) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h1>Tableau de bord</h1>

            <h2>
                Bonjour {utilisateur.nom}
            </h2>

            <p>
                Email : {utilisateur.email}
            </p>

            <p>
                Niveau : {utilisateur.niveau}
            </p>

            <button onClick={seDeconnecter}>
                Se déconnecter
            </button>
        </div>
    );
}

export default Dashboard;