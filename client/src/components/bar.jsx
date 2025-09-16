import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

function Bar({ onAddClick }) {
    const navigate = useNavigate();
    function handleLogout() {
        localStorage.removeItem("accessToken");
        navigate("/login");
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ display: { xs: "none", sm: "block" } }}
                >
                    Contacts
                </Typography>

                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ "aria-label": "search" }}
                    />
                </Search>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    onClick={() => onAddClick()}
                >
                    <AddIcon />
                </IconButton>

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
