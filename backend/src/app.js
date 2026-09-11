const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//test route
app.get("/api/test", (req, res) => {
    res.json({
        message: "Bienvenue sur l'API Parléo !",
    });
});

module.exports = app;