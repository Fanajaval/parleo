import { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("Connexion en cours...");

    useEffect(() => {
        fetch("http://localhost:5000/api/test")
            .then((response) => response.json())
            .then((data) => {
                setMessage(data.message);
            })
            .catch((error) => {
                console.error(error);
                setMessage("Erreur de connexion avec le serveur.");
            });
    }, []);

    return (
        <div>
            <h1>Parléo 🇫🇷</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;