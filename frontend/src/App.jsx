import { BrowserRouter, Routes, Route } from "react-router-dom";

import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";

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