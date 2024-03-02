import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AddressService from "../services/AddressesService";
import NotificationContext from "./contexts/NotificationContext";

const NewAddressModal = () => {
  const EMPTY_ADDRESS = "";

  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const setNotification = useContext(NotificationContext);

  const handleClose = () => {
    setAddress(EMPTY_ADDRESS);
    setShowModal(false);
  };

  const handleSave = () => {
    AddressService.append(address);
    setNotification("New address added");
    handleClose();
  };

  return (
    <Box>
      <Button variant="outlined" onClick={() => setShowModal(true)}>
        New address
      </Button>
      <Dialog open={showModal} onClose={handleClose}>
        <DialogContent>
          <TextField
            label="Address"
            value={address}
            onChange={(event) => {
              setAddress(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewAddressModal;
