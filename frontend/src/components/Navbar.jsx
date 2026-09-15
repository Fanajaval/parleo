import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const utilisateurStocke = localStorage.getItem("utilisateur");
    const utilisateur = utilisateurStocke ? JSON.parse(utilisateurStocke) : null;

    const seDeconnecter = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("utilisateur");

        navigate("/connexion");
    };

    return (
        <header>
            <div>
                <strong>Parléo</strong>
            </div>

            <div>
                {utilisateur && (
                    <span>Bonjour {utilisateur.nom}</span>
                )}

                <button onClick={seDeconnecter}>Se déconnecter</button>
            </div>
        </header>
    );
}

export default Navbar;