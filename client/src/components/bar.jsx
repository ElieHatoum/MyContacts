import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

function Bar({ onAddClick }) {
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.removeItem("accessToken");
        navigate("/login");
    }

    return (
        <AppBar
            position="sticky"
            sx={{
                borderRadius: "20px",
            }}
        >
            <Toolbar>
                <Typography variant="h6">Contacts</Typography>

                <Button
                    size="large"
                    variant="contained"
                    sx={{
                        color: "#000000ff",
                        backgroundColor: "white",
                        flexGrow: 1,
                        marginLeft: "20%",
                    }}
                    onClick={() => onAddClick()}
                >
                    ADD
                </Button>

                <Box sx={{ flexGrow: 1 }} />

                <IconButton
                    size="large"
                    edge="end"
                    onClick={handleLogout}
                    color="inherit"
                >
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Bar;
