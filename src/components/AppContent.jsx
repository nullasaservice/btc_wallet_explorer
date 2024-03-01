import { Stack, Typography } from "@mui/material";
import React from "react";
import PriceCard from "./PriceCard";
import NewAddressModal from "./NewAddressModal";
import AddressInfoRenderer from "./AddressInfoRenderer";

const AppContent = () => (
  <>
    <Typography variant="h6" marginY={2}>
      BTC Wallet Explorer
    </Typography>
    <Stack direction="row" spacing={2}>
      <PriceCard currency="USD" />
      <PriceCard currency="EUR" />
    </Stack>
    <NewAddressModal />
    <AddressInfoRenderer />
  </>
);

export default AppContent;
