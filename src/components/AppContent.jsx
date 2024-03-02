import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import PriceCard from "./PriceCard";
import NewAddressModal from "./NewAddressModal";
import AddressInfoRenderer from "./AddressInfoRenderer";
import PrivacyModeSwitch from "./PrivacyModeSwitch";

const AppContent = () => (
  <>
    <Typography variant="h6" marginY={2}>
      BTC Wallet Explorer
    </Typography>
    <Stack direction="row" spacing={2}>
      <PriceCard currency="USD" />
      <PriceCard currency="EUR" />
    </Stack>
    <Box display="flex" justifyContent="center" width="100%" marginY={2}>
      <NewAddressModal />
      <PrivacyModeSwitch />
    </Box>
    <AddressInfoRenderer />
  </>
);

export default AppContent;
