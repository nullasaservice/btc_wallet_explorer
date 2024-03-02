import { Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AddressService from "../services/AddressesService";
import NotificationContext from "./contexts/NotificationContext";

const EditAddressModal = ({ addressIndex }) => {
  const [addressToEdit, setAddressToEdit] = useState();
  const setNotification = useContext(NotificationContext);

  const handleEdit = () => {
    const address = AddressService.getWithIndex(addressIndex);

    setAddressToEdit(address);
  };

  const handleClose = () => {
    setAddressToEdit();
  };

  const handleSave = () => {
    AddressService.addAtIndex(addressIndex, addressToEdit);
    setNotification(`Address #${addressIndex + 1} modified`);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleEdit} sx={{ marginRight: 2 }}>
        <Edit />
      </Button>
      <Dialog open={addressToEdit != null} onClose={handleClose}>
        <DialogContent>
          <TextField
            label="Address"
            value={addressToEdit}
            onChange={(event) => {
              setAddressToEdit(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditAddressModal;
