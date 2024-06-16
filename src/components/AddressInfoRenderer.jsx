import { Box, Button, Stack } from "@mui/material";
import React, { useContext, useState } from "react";
import { ArrowLeft, ArrowRight, Help, OpenInNew } from "@mui/icons-material";
import AddressCard from "./AddressCard";
import BtcAddressesContext from "./contexts/BtcAddressesContext";
import { useNavigate } from "react-router-dom";

const AddressInfoRenderer = () => {
  const [addressIndex, setAddressIndex] = useState(0);
  const { getCount, isEmpty, getWithIndex } = useContext(BtcAddressesContext);
  const navigate = useNavigate();

  const isPreviousButtonDisabled = addressIndex === 0;
  const isNextButtonDisabled = addressIndex === getCount() - 1;

  const handlePrevious = () => {
    setAddressIndex((i) => i - 1);
  };

  const handleDetails = () => {
    navigate(`/addresses/${addressIndex}`);
  };

  const handleNext = () => {
    setAddressIndex((i) => i + 1);
  };

  if (isEmpty()) {
    return (
      <>
        <Help
          fontSize="large"
          color="info"
          sx={{ marginTop: 1, marginBottom: -1 }}
        />
        <p>Add addresses to get them displayed here.</p>
      </>
    );
  }

  return (
    <Box marginX={2}>
      <AddressCard index={addressIndex} address={getWithIndex(addressIndex)} />
      <Stack
        justifyContent="space-between"
        marginTop={2}
        direction="row"
        spacing={2}
      >
        <Button
          variant="contained"
          onClick={handlePrevious}
          disabled={isPreviousButtonDisabled}
        >
          <ArrowLeft />
        </Button>
        <Button variant="contained" color="success" onClick={handleDetails}>
          <OpenInNew />
          <Box marginLeft={1}>Details</Box>
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={isNextButtonDisabled}
        >
          <ArrowRight />
        </Button>
      </Stack>
    </Box>
  );
};

export default AddressInfoRenderer;
