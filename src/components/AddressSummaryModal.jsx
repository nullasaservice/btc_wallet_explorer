import React, { useContext, useState } from "react";
import CurrentBtcAddressContext from "./contexts/CurrentBtcAddressContext";
import { Box, Button, Dialog, DialogContent } from "@mui/material";
import AddressCardInfo from "./AddressCardInfo";
import BtcSatsContext from "./contexts/BtcSatsContext";
import ActionButton from "./ActionButton";
import { Visibility } from "@mui/icons-material";

const AddressSummaryModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { showSats } = useContext(BtcSatsContext);
  const { getInputBalance, getOutputBalance, getCurrentBalance } = useContext(
    CurrentBtcAddressContext
  );

  const handleOpen = () => setShowModal(true);

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Dialog open={showModal} onClose={handleClose}>
        <DialogContent>
          <AddressCardInfo
            disablePrivacyMode
            label={`Total ${showSats ? "sats" : "BTC"} received`}
            value={getInputBalance()}
          />
          <AddressCardInfo
            disablePrivacyMode
            label={`Total ${showSats ? "sats" : "BTC"} sent`}
            value={getOutputBalance()}
          />
          <AddressCardInfo
            disablePrivacyMode
            label="Current balance"
            value={getCurrentBalance()}
          />
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Button variant="outlined" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
      <ActionButton
        color="secondary"
        icon={<Visibility />}
        onClick={handleOpen}
        text="Check stats"
      />
    </>
  );
};

export default AddressSummaryModal;
