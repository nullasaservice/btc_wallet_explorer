import { Box, Button } from "@mui/material";
import React from "react";

const ActionButton = ({ variant, onClick: handleClick, icon, text, color }) => (
  <Button variant={variant} onClick={handleClick} color={color}>
    {icon}
    <Box marginLeft={1}>{text}</Box>
  </Button>
);

export default ActionButton;
