import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/home.jsx";
import LoginForm from "./components/login.jsx";
import RegisterForm from "./components/register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./publicRoute.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <RegisterForm />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginForm />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
