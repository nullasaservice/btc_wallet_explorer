import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import NotificationContext from "./contexts/NotificationContext";
import BaseAddressModal from "./BaseAddressModal";
import BtcAddressesContext from "./contexts/BtcAddressesContext";

const EditAddressModal = ({ addressIndex }) => {
  const [addressToEdit, setAddressToEdit] = useState();
  const [showModal, setShowModal] = useState(false);
  const setNotification = useContext(NotificationContext);
  const { getWithIndex, addNewAddressAtIndex } =
    useContext(BtcAddressesContext);

  const handleEdit = () => {
    const address = getWithIndex(addressIndex);

    setAddressToEdit(address);
    setShowModal(true);
  };

  const handleClose = () => {
    setAddressToEdit();
    setShowModal(false);
  };

  const handleSave = (address) => {
    addNewAddressAtIndex(addressIndex, address);
    setNotification(`Address #${addressIndex + 1} modified`);

    handleClose();
  };

  return (
    <>
      <Button variant="contained" onClick={handleEdit} sx={{ marginRight: 2 }}>
        <Edit />
      </Button>
      <BaseAddressModal
        showModal={showModal}
        initialValue={addressToEdit}
        onSave={handleSave}
        onClose={handleClose}
      />
    </>
  );
};

export default EditAddressModal;
