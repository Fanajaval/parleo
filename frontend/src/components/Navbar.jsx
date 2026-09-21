import { NavLink, useNavigate } from "react-router-dom";

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
        <header className="topbar">
            <div className="brand-block">
                <NavLink to="/dashboard" className="brand" end>
                    Parléo
                </NavLink>
            </div>

            <nav className="main-nav">
                <NavLink to="/dashboard" end>Dashboard</NavLink>
                <NavLink to="/apprendre">Apprendre</NavLink>
                <NavLink to="/exercices">Exercices</NavLink>
                <NavLink to="/conversation">Conversation IA</NavLink>
                <NavLink to="/profil">Profil</NavLink>
            </nav>

            <div className="user-actions">
                {utilisateur && <span>Bonjour {utilisateur.nom}</span>}
                <button type="button" className="logout-button" onClick={seDeconnecter}>
                    Se déconnecter
                </button>
            </div>
        </header>
    );
}

export default Navbar;