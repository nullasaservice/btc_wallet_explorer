import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import ShowSatsSwitch from "../components/ShowSatsSwitch";

const SettingsPage = () => {
  return (
    <Card>
      <CardContent>
        <Typography textAlign="center" variant="h6" marginBottom={2}>
          Settings
        </Typography>
        <ShowSatsSwitch />
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
