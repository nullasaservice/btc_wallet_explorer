import { Box, Button } from "@mui/material";
import React from "react";

const ActionButton = ({ onClick: handleClick, icon, text, color }) => (
  <Button variant="contained" onClick={handleClick} color={color}>
    {icon}
    <Box marginLeft={1}>{text}</Box>
  </Button>
);

export default ActionButton;
