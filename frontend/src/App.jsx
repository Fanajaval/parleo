import { BrowserRouter, Routes, Route } from "react-router-dom";

import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Dashboard from "./pages/Dashboard";
import RouteProtegee from "./components/RouteProtegee";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/connexion" element={<Connexion />} />

                <Route path="/inscription" element={<Inscription />} />

                <Route
                    path="/dashboard"
                    element={
                        <RouteProtegee>
                            <Dashboard />
                        </RouteProtegee>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;