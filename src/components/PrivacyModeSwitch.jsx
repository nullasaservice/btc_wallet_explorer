import { Button } from "@mui/material";
import React, { useContext } from "react";
import PrivacyModeContext from "./contexts/PrivacyModeContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PrivacyModeSwitch = () => {
  const { privacyMode, togglePrivacyMode } = useContext(PrivacyModeContext);

  return (
    <Button
      variant="outlined"
      onClick={togglePrivacyMode}
      sx={{ marginLeft: 1 }}
    >
      {privacyMode ? <VisibilityOff /> : <Visibility />}
    </Button>
  );
};

export default PrivacyModeSwitch;
