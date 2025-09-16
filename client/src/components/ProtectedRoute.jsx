import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children }) {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    let decodedToken;
    try {
        decodedToken = jwtDecode(token);
    } catch {
        return <Navigate to="/login" replace />;
    }

    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
        localStorage.removeItem("accessToken");
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
