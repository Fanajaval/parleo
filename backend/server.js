const app = require("./src/app");
const pool = require("./src/config/database");

const PORT = 5000;

async function startServer() {
    try {
        const connection = await pool.getConnection();

        console.log("Connexion à MySQL réussie !");

        connection.release();

        app.listen(PORT, () => {
            console.log(`Serveur Parléo lancé sur http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Erreur de connexion à MySQL :", error.message);
    }
}

startServer();