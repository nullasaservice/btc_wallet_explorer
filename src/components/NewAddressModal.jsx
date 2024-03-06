import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AddressService from "../services/AddressService";
import NotificationContext from "./contexts/NotificationContext";

const NewAddressModal = () => {
  const EMPTY_ADDRESS = "";

  const [showModal, setShowModal] = useState(false);
  const [isTextFieldTouched, setIsTextFieldTouched] = useState(false);
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const setNotification = useContext(NotificationContext);

  const isEmptyAddress = address === EMPTY_ADDRESS;
  const hasTextFieldError = isEmptyAddress && isTextFieldTouched;

  const handleClose = () => {
    setAddress(EMPTY_ADDRESS);
    setIsTextFieldTouched(false);
    setShowModal(false);
  };

  const handleSave = () => {
    if (isEmptyAddress) {
      setIsTextFieldTouched(true);
    } else {
      AddressService.append(address);
      setNotification("New address added");
      handleClose();
    }
  };

  const handleChange = (event) => {
    !isTextFieldTouched && setIsTextFieldTouched(true);
    setAddress(event.target.value);
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
            error={hasTextFieldError}
            onChange={handleChange}
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
