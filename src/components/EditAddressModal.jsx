import { Edit } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import NotificationContext from "./contexts/NotificationContext";
import BaseAddressModal from "./BaseAddressModal";
import BtcAddressesContext from "./contexts/BtcAddressesContext";
import ActionButton from "./ActionButton";
import { useParams } from "react-router-dom";

const EditAddressModal = () => {
  const [addressToEdit, setAddressToEdit] = useState();
  const [showModal, setShowModal] = useState(false);
  const setNotification = useContext(NotificationContext);
  const { addressIndex } = useParams();
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
    setNotification("Address modified successfully");

    handleClose();
  };

  return (
    <>
      <ActionButton icon={<Edit />} onClick={handleEdit} text="Edit address" />
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
