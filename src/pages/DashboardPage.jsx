import React from "react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthStore } from "../store/authStore";
import RobotCard from "../components/RobotCard";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AccountCircle from "@mui/icons-material/AccountCircle";

function DashboardPage() {
  const { token, user, logout } = useAuthStore();
  const [robots, setRobots] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleClose();
    logout();
  };

  useEffect(() => {
    const socket = io("ws://localhost:5000", { auth: { token } });
    socket.on("connect", () => setIsConnected(true));
    socket.on("telemetry", (data) => {
      setRobots((prevRobots) => ({ ...prevRobots, [data.name]: data }));
    });
    socket.on("disconnect", () => setIsConnected(false));
    return () => socket.disconnect();
  }, [token]);

  const robotArray = Object.values(robots);

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/dashboard-bg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar>
          <SmartToyIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Real-Time Fleet Dashboard
          </Typography>
          <div>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{ mt: "10px" }}
            >
              <MenuItem disabled>Welcome, {user?.name || "Admin"}</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {!isConnected && (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress sx={{ mr: 2 }} />
            <Typography>Connecting...</Typography>
          </Box>
        )}
        {isConnected && robotArray.length === 0 && (
          <Typography sx={{ textAlign: "center", p: 3 }}>
            Waiting for data...
          </Typography>
        )}
        <Grid container spacing={3}>
          {robotArray.map((robot) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={robot._id}>
              <RobotCard robot={robot} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default DashboardPage;
