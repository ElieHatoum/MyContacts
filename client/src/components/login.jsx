import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import axios from "axios";

function LoginForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const requestBody = { email, password };
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                requestBody
            );

            localStorage.setItem("accessToken", response.data.accessToken);
            navigate("/home");
        } catch (error) {
            console.log(error);

            let errorMessage =
                error.response?.data?.message || "Something went wrong";

            const validationErrors = error.response?.data?.data?.errors;
            if (validationErrors) {
                errorMessage = Object.values(validationErrors)
                    .flat()
                    .join("<br>");
            }

            Swal.fire({
                icon: "error",
                title: "Oops...",
                html: errorMessage,
            });
        }
    }

    return (
        <div className="container" style={{ marginTop: "10vh" }}>
            <form onSubmit={handleLogin}>
                <h2 style={{ textAlign: "center" }}>Login to your account</h2>

                <Stack
                    spacing={2}
                    sx={{ width: "300px", margin: "0 auto", mt: 5 }}
                >
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
                        LOGIN
                    </Button>
                </Stack>

                <p style={{ marginTop: "2", textAlign: "center" }}>
                    Don't have an account?{" "}
                    <Link to="/register">Create an new account</Link>
                </p>
            </form>
        </div>
    );
}

export default LoginForm;
