import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressService from "../services/AddressesService";
import { ArrowLeft, ArrowRight, Delete, Help } from "@mui/icons-material";
import AddressCard from "./AddressCard";
import EditAddressModal from "./EditAddressModal";

const AddressInfoRenderer = () => {
  const [_, setNum] = useState(0);
  const [addressIndex, setAddressIndex] = useState(0);

  const isPreviousButtonDisabled = addressIndex === 0;
  const isNextButtonDisabled = addressIndex === AddressService.getCount() - 1;

  // Ugly way to update this component when new address is added
  useEffect(() => {
    const numIncrementer = () => setNum((n) => n + 1);

    window.addEventListener("storage", numIncrementer);

    return () => window.removeEventListener("storage", numIncrementer);
  }, []);

  const handlePrevious = () => {
    setAddressIndex((i) => i - 1);
  };

  const handleNext = () => {
    setAddressIndex((i) => i + 1);
  };

  const handleRemoval = () => {
    AddressService.removeAtIndex(addressIndex);
    setAddressIndex(0);
  };

  if (AddressService.isEmpty()) {
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
      <AddressCard
        index={addressIndex}
        address={AddressService.getWithIndex(addressIndex)}
      />
      <Box width="100%" display="flex" justifyContent="center" marginTop={2}>
        <Button
          variant="contained"
          onClick={handlePrevious}
          disabled={isPreviousButtonDisabled}
          sx={{ marginRight: 2 }}
        >
          <ArrowLeft />
        </Button>
        <EditAddressModal addressIndex={addressIndex} />
        <Button
          variant="contained"
          onClick={handleRemoval}
          sx={{ marginRight: 2 }}
          color="error"
        >
          <Delete />
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={isNextButtonDisabled}
        >
          <ArrowRight />
        </Button>
      </Box>
    </Box>
  );
};

export default AddressInfoRenderer;
