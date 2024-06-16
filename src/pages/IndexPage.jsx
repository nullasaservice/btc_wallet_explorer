import { Box, Stack } from "@mui/material";
import React from "react";
import PriceCard from "../components/PriceCard";
import NewAddressModal from "../components/NewAddressModal";
import PrivacyModeSwitch from "../components/PrivacyModeSwitch";
import AddressInfoRenderer from "../components/AddressInfoRenderer";

const IndexPage = () => (
  <>
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

export default IndexPage;
