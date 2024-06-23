import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActionButton from "./ActionButton";
import { Delete } from "@mui/icons-material";
import BtcAddressesContext from "./contexts/BtcAddressesContext";
import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import CurrentBtcAddressContext from "./contexts/CurrentBtcAddressContext";

const DeleteAddressModal = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { addressIndex } = useParams();
  const { removeAddressAtIndex } = useContext(BtcAddressesContext);
  const { setAddressIndex } = useContext(CurrentBtcAddressContext);

  const handleClose = () => setShowModal(false);

  const handleOpen = () => setShowModal(true);

  const handleDelete = () => {
    removeAddressAtIndex(addressIndex);
    navigate("/");
    setAddressIndex(0);
  };

  return (
    <>
      <ActionButton
        icon={<Delete />}
        color="error"
        text="Delete address"
        onClick={handleOpen}
      />
      <Dialog open={showModal} onClose={handleClose}>
        <Box margin={2}>
          <Typography>Are you sure you want to delete this address?</Typography>
          <Stack justifyContent="space-between" direction="row" marginTop={2}>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDelete}>Yes</Button>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
};

export default DeleteAddressModal;
