import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import apiClient from "../api/axiosConfig";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      login(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card sx={{ minWidth: 275, maxWidth: 400, p: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Robot Fleet Dashboard
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
                {error}
              </Alert>
            )}
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPage;
