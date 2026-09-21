const express = require("express");
const cors = require("cors");

const utilisateurRoutes = require("./routes/utilisateurRoutes");
const authRoutes = require("./routes/authRoutes");
const apprentissageRoutes = require("./routes/apprentissageRoutes");
const conversationRoutes = require("./routes/conversationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
    res.json({
        message: "Bienvenue sur l'API Parléo !"
    });
});

app.use("/api/utilisateurs", utilisateurRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", apprentissageRoutes);
app.use("/api", conversationRoutes);

module.exports = app;