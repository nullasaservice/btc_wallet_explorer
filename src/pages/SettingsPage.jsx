import React from "react";
import AppHeader from "../components/AppHeader";
import { Card, CardContent, Typography } from "@mui/material";
import ShowSatsSwitch from "../components/ShowSatsSwitch";

const SettingsPage = () => {
  return (
    <>
      <AppHeader />
      <Card>
        <CardContent>
          <Typography textAlign="center" variant="h6" marginBottom={2}>
            Settings
          </Typography>
          <ShowSatsSwitch />
        </CardContent>
      </Card>
    </>
  );
};

export default SettingsPage;
