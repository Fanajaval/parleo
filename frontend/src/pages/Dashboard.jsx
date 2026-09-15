import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";

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
            <Navbar />
            <main>   
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
            </main>     
        </div>
    );
}

export default Dashboard;