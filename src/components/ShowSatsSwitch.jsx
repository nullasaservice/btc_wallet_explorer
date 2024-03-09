import { FormControlLabel, Switch } from "@mui/material";
import React, { useContext } from "react";
import BtcSatsContext from "./contexts/BtcSatsContext";

const ShowSatsSwitch = () => {
  const { showSats, toggleSetting } = useContext(BtcSatsContext);

  return (
    <FormControlLabel
      control={<Switch checked={showSats} onChange={toggleSetting} />}
      label="Show address balance in Satoshis"
    />
  );
};

export default ShowSatsSwitch;
