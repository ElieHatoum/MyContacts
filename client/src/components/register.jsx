import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

function RegisterForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleRegister(e) {
        e.preventDefault();
        try {
            const requestBody = { email, password };
            await axios.post(
                "http://localhost:3000/api/auth/register",
                requestBody
            );
            setErrorMessage("");
            navigate("/login");
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                let errorMessage =
                    error.response?.data?.message || "Something went wrong";

                const validationErrors = error.response?.data?.data?.errors;
                if (validationErrors) {
                    errorMessage = Object.values(validationErrors)
                        .flat()
                        .join(" ");
                }

                setErrorMessage(errorMessage.split(":").pop().trim());
            } else {
                setErrorMessage("An unexpected error occurred");
            }
        }
    }

    return (
        <div className="container" style={{ marginTop: "10vh" }}>
            <form onSubmit={handleRegister}>
                <h2 style={{ textAlign: "center" }}>Create a new account</h2>

                <Stack
                    spacing={2}
                    sx={{ width: "300px", margin: "0 auto", mt: 5 }}
                >
                    {errorMessage && (
                        <Alert variant="outlined" severity="error">
                            {errorMessage}
                        </Alert>
                    )}
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        autoComplete="off"
                        required
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        required
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" type="submit" fullWidth>
                        SIGN UP
                    </Button>
                </Stack>

                <p style={{ marginTop: "2", textAlign: "center" }}>
                    Already have an account?{" "}
                    <Link to="/login">Login to an existing account</Link>
                </p>
            </form>
        </div>
    );
}

export default RegisterForm;
