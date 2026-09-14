import { Navigate } from "react-router-dom";

function RouteProtegee({ children }) {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/connexion" replace />;
    }

    return children;
}

export default RouteProtegee;