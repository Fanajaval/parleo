const API_URL = "http://localhost:5000/api";

const traiterReponse = async (response) => {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue.");
    }

    return data;
};

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
};

export const inscrireUtilisateur = async (donnees) => {
    const response = await fetch(`${API_URL}/auth/inscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donnees),
    });

    return traiterReponse(response);
};

export const connecterUtilisateur = async (donnees) => {
    const response = await fetch(`${API_URL}/auth/connexion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donnees),
    });

    return traiterReponse(response);
};

export const getMonProfil = async () => {
    const response = await fetch(`${API_URL}/utilisateurs/me`, {
        headers: getAuthHeaders(),
    });

    return traiterReponse(response);
};

export const mettreAJourProfil = async (donnees) => {
    const response = await fetch(`${API_URL}/utilisateurs/me`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(donnees),
    });

    return traiterReponse(response);
};

export const getProgression = async () => {
    const response = await fetch(`${API_URL}/utilisateurs/progression`, {
        headers: getAuthHeaders(),
    });

    return traiterReponse(response);
};

export const getLecons = async () => {
    const response = await fetch(`${API_URL}/apprendre`);
    return traiterReponse(response);
};

export const getExercices = async () => {
    const response = await fetch(`${API_URL}/exercices`);
    return traiterReponse(response);
};