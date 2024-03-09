import { ArrowBack, Settings } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SettingsButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/settings");
  };

  return (
    <Button onClick={handleClick}>
      <Settings />
    </Button>
  );
};

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Button onClick={handleBack}>
      <ArrowBack />
    </Button>
  );
};

const AppHeader = () => {
  const { pathname } = useLocation();

  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Box
        flex="1"
        marginRight="auto"
        justifyContent="center"
        display="flex"
        alignItems="center"
      >
        {pathname === "/" ? <SettingsButton /> : <BackButton />}
      </Box>
      <Typography variant="h6" marginY={2}>
        BTC Wallet Explorer
      </Typography>
      <Box flex="1" />
    </Box>
  );
};

export default AppHeader;
