import React from "react";
import AppHeader from "./AppHeader";
import { Box } from "@mui/material";

const PageLayout = ({ children }) => (
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

export default PageLayout;
