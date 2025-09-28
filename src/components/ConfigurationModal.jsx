import React from "react";
import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import apiClient from "../api/axiosConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ConfigurationModal({ open, onClose, robot }) {
  // Guard clause to prevent errors if robot is not yet defined
  if (!robot) {
    return null;
  }
  const [speed, setSpeed] = useState("");
  const [mode, setMode] = useState("");
  const [task, setTask] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const config = { speed: Number(speed), mode, task };

    try {
      await apiClient.put(`/robots/${robot._id}/config`, { config });
      setMessage("Configuration updated successfully!");
      setTimeout(() => {
        onClose();
        setMessage("");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update configuration.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Configure Robot: {robot.name} {/* <-- Final change here */}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Speed"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <TextField
            label="Mode"
            variant="outlined"
            fullWidth
            margin="normal"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          />
          <TextField
            label="Task"
            variant="outlined"
            fullWidth
            margin="normal"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={onClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default ConfigurationModal;
