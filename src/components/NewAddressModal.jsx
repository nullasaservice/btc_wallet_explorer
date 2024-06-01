import { Box, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import NotificationContext from "./contexts/NotificationContext";
import BaseAddressModal from "./BaseAddressModal";
import BtcAddressesContext from "./contexts/BtcAddressesContext";

const EMPTY_ADDRESS = "";

const NewAddressModal = () => {
  const [showModal, setShowModal] = useState(false);
  const setNotification = useContext(NotificationContext);
  const { addNewAddress } = useContext(BtcAddressesContext);

  const handleSave = (address) => {
    addNewAddress(address);
    setNotification("New address added");
  };

  return (
    <Box>
      <Button variant="outlined" onClick={() => setShowModal(true)}>
        New address
      </Button>
      <BaseAddressModal
        showModal={showModal}
        initialValue={EMPTY_ADDRESS}
        onSave={handleSave}
        onClose={() => setShowModal(false)}
      />
    </Box>
  );
};

export default NewAddressModal;
