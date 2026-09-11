const app = require("./src/app");

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Serveur Parléo lancé sur http://localhost:${PORT}`);
});