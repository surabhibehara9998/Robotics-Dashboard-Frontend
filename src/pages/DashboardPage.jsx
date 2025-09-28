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
} from "@mui/material";

function DashboardPage() {
  const { token, user, logout } = useAuthStore();
  const [robots, setRobots] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io("ws://localhost:5000", {
      auth: { token },
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server!");
      setIsConnected(true);
    });

    socket.on("telemetry", (data) => {
      setRobots((prevRobots) => ({
        ...prevRobots,
        [data.robotId]: data,
      }));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server.");
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  const robotArray = Object.values(robots);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Real-Time Fleet Dashboard
          </Typography>
          <Typography sx={{ mr: 2 }}>
            Welcome, {user?.name || "Admin"}
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {!isConnected && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 3,
            }}
          >
            <CircularProgress sx={{ mr: 2 }} />
            <Typography>Connecting to real-time service...</Typography>
          </Box>
        )}
        {isConnected && robotArray.length === 0 && (
          <Typography sx={{ textAlign: "center", p: 3 }}>
            Waiting for robot telemetry data...
          </Typography>
        )}
        <Grid container spacing={3}>
          {robotArray.map((robot) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={robot.robotId}>
              <RobotCard robot={robot} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default DashboardPage;
