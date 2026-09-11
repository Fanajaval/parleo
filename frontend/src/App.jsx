import { BrowserRouter, Routes, Route } from "react-router-dom";

function Connexion() {
    return <h1>Page de connexion</h1>;
}

function Inscription() {
    return <h1>Page d'inscription</h1>;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/inscription" element={<Inscription />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;