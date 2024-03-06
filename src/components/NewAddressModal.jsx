import { Box, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import AddressService from "../services/AddressService";
import NotificationContext from "./contexts/NotificationContext";
import BaseAddressModal from "./BaseAddressModal";

const EMPTY_ADDRESS = "";

const NewAddressModal = () => {
  const [showModal, setShowModal] = useState(false);
  const setNotification = useContext(NotificationContext);

  const handleSave = (address) => {
    AddressService.append(address);
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
