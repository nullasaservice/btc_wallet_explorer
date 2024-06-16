import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActionButton from "./ActionButton";
import { Delete } from "@mui/icons-material";
import BtcAddressesContext from "./contexts/BtcAddressesContext";

const DeleteAddressButton = () => {
  const navigate = useNavigate();
  const { addressIndex } = useParams();
  const { removeAddressAtIndex } = useContext(BtcAddressesContext);

  const handleDelete = () => {
    removeAddressAtIndex(addressIndex);
    navigate(-1);
  };

  return (
    <ActionButton
      icon={<Delete />}
      color="error"
      variant="contained"
      text="Delete address"
      onClick={handleDelete}
    />
  );
};

export default DeleteAddressButton;
