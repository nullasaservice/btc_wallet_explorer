import { Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import AddressService from "../services/AddressesService";

const EditAddressModal = ({ addressIndex }) => {
  const [addressToEdit, setAddressToEdit] = useState();

  const handleEdit = () => {
    const address = AddressService.getWithIndex(addressIndex);

    setAddressToEdit(address);
  };

  const handleClose = () => {
    setAddressToEdit();
  };

  const handleSave = () => {
    AddressService.addAtIndex(addressIndex, addressToEdit);

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
