import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Dashboard from "./pages/Dashboard";
import Apprendre from "./pages/Apprendre";
import Exercices from "./pages/Exercices";
import Conversation from "./pages/Conversation";
import Profil from "./pages/Profil";
import Navbar from "./components/Navbar";
import RouteProtegee from "./components/RouteProtegee";

function AppLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/inscription" element={<Inscription />} />

                <Route
                    path="/dashboard"
                    element={
                        <RouteProtegee>
                            <AppLayout>
                                <Dashboard />
                            </AppLayout>
                        </RouteProtegee>
                    }
                />
                <Route
                    path="/apprendre"
                    element={
                        <RouteProtegee>
                            <AppLayout>
                                <Apprendre />
                            </AppLayout>
                        </RouteProtegee>
                    }
                />
                <Route
                    path="/exercices"
                    element={
                        <RouteProtegee>
                            <AppLayout>
                                <Exercices />
                            </AppLayout>
                        </RouteProtegee>
                    }
                />
                <Route
                    path="/conversation"
                    element={
                        <RouteProtegee>
                            <AppLayout>
                                <Conversation />
                            </AppLayout>
                        </RouteProtegee>
                    }
                />
                <Route
                    path="/profil"
                    element={
                        <RouteProtegee>
                            <AppLayout>
                                <Profil />
                            </AppLayout>
                        </RouteProtegee>
                    }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;