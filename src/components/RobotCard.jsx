import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Button,
  CardActions,
} from "@mui/material";
import ConfigurationModal from "./ConfigurationModal";

const statusColors = {
  active: "success",
  inactive: "default",
  charging: "info",
  error: "error",
};

function RobotCard({ robot }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const batteryColor =
    robot.battery < 20 ? "error" : robot.battery < 50 ? "warning" : "success";

  return (
    <>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="h6" component="div">
              {robot.name} {/* <-- Updated from robot.robotId */}
            </Typography>
            <Chip
              label={robot.status}
              color={statusColors[robot.status] || "default"}
              size="small"
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Lat: {robot.location.lat.toFixed(4)}, Lon:{" "}
            {robot.location.lon.toFixed(4)}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Battery: {robot.battery}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={robot.battery}
              color={batteryColor}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            CONFIGURE
          </Button>
        </CardActions>
      </Card>
      <ConfigurationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        robot={robot}
      />
    </>
  );
}

export default RobotCard;
