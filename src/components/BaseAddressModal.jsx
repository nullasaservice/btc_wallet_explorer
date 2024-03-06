import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const EMPTY_ADDRESS = "";

const BaseAddressModal = ({
  initialValue,
  showModal,
  onClose: handleCloseCallback,
  onSave: handleSaveCallback,
}) => {
  const [address, setAddress] = useState(EMPTY_ADDRESS);
  const [isTextFieldTouched, setIsTextFieldTouched] = useState(false);

  const isEmptyAddress = address === EMPTY_ADDRESS;
  const hasTextFieldError = isEmptyAddress && isTextFieldTouched;

  const handleClose = () => {
    setAddress(EMPTY_ADDRESS);
    setIsTextFieldTouched(false);

    handleCloseCallback();
  };

  const handleSave = () => {
    if (isEmptyAddress) {
      setIsTextFieldTouched(true);
    } else {
      handleSaveCallback(address);

      handleClose();
    }
  };

  const handleChange = (event) => {
    !isTextFieldTouched && setIsTextFieldTouched(true);
    setAddress(event.target.value);
  };

  useEffect(() => {
    setAddress(initialValue);
  }, [showModal, initialValue]);

  return (
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
  );
};

export default BaseAddressModal;
