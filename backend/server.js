const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//test route
app.get("/api/test", (req, res) => {
    res.json({
        message: "Bienvenue sur l'API Parléo !",
    });
});

app.listen(PORT, () => {
    console.log(`Serveur Parléo lancé sur http://localhost:${PORT}`);
});