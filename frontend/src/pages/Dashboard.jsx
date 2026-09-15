import { useEffect, useState } from "react";

function Dashboard() {
    const [utilisateur, setUtilisateur] = useState(null);

    useEffect(() => {
        const utilisateurStocke = localStorage.getItem("utilisateur");

        if (utilisateurStocke) {
            setUtilisateur(JSON.parse(utilisateurStocke));
        }
    }, []);

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
        </div>
    );
}

export default Dashboard;