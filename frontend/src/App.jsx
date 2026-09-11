import { useEffect, useState } from "react";

function App() {
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [chargement, setChargement] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/utilisateurs")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des utilisateurs");
                }

                return response.json();
            })
            .then((data) => {
                setUtilisateurs(data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setChargement(false);
            });
    }, []);

    return (
        <div>
            <h1>Parléo 🇫🇷</h1>

            <h2>Utilisateurs</h2>

            {chargement ? (
                <p>Chargement...</p>
            ) : utilisateurs.length === 0 ? (
                <p>Aucun utilisateur pour le moment.</p>
            ) : (
                <ul>
                    {utilisateurs.map((utilisateur) => (
                        <li key={utilisateur.id}>
                            {utilisateur.nom} - {utilisateur.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;