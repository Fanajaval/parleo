const API_URL = "http://localhost:5000/api";

export const inscrireUtilisateur = async (donnees) => {
    const response = await fetch(`${API_URL}/auth/inscription`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(donnees),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue.");
    }

    return data;
};