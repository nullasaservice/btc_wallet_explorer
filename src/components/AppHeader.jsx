import { ArrowBack, Refresh, Settings } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BtcPriceContext from "./contexts/BtcPriceContext";

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

const RefreshPricesButton = () => {
  const { refreshPrices } = useContext(BtcPriceContext);

  const handlePriceRefresh = () => {
    refreshPrices();
  };

  return (
    <Button onClick={handlePriceRefresh}>
      <Refresh />
    </Button>
  );
};

const AppHeader = () => {
  const { pathname } = useLocation();

  return (
    <Box display="flex" width="100%">
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
      <Box
        flex="1"
        marginLeft="auto"
        justifyContent="center"
        display="flex"
        alignItems="center"
      >
        {pathname === "/" && <RefreshPricesButton />}
      </Box>
    </Box>
  );
};

export default AppHeader;
