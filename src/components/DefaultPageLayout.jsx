import React from "react";
import AppHeader from "./AppHeader";
import { Box } from "@mui/material";

const DefaultPageLayout = ({ children }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    marginX={2}
  >
    <AppHeader />
    {children}
  </Box>
);

export default DefaultPageLayout;
