import { Typography } from "@mui/material";
import React, { useContext } from "react";
import PrivacyModeContext from "./contexts/PrivacyModeContext";

const AddressCardInfo = ({ label, value, disablePrivacyMode }) => {
  const { privacyMode } = useContext(PrivacyModeContext);
  const shouldHideContent = privacyMode && !disablePrivacyMode;

  return (
    <>
      <p>{shouldHideContent ? "*****" : value}</p>
      <Typography color="text.secondary" sx={{ marginTop: -2, fontSize: 14 }}>
        {label}
      </Typography>
    </>
  );
};

export default AddressCardInfo;
