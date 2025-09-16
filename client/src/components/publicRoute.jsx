import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
    const token = localStorage.getItem("accessToken");

    if (token) {
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default PublicRoute;
