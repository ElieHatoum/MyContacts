import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function HomePage() {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("accessToken");
        navigate("/login");
    }

    return (
        <Button variant="contained" onClick={handleLogout}>
            LOGOUT
        </Button>
    );
}

export default HomePage;
