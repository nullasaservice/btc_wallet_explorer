import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddressesService from "../services/AddressesService";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import AddressCard from "./AddressCard";

const AddressInfoRenderer = () => {
  const [num, setNum] = useState(0);
  const [addressIndex, setAddressIndex] = useState(0);

  const isPreviousButtonDisabled = addressIndex === 0;
  const isNextButtonDisabled =
    addressIndex === AddressesService.getNumberAddresses() - 1;

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

  if (AddressesService.isEmpty()) {
    return <p>Add addresses to get them dispayed here.</p>;
  }

  return (
    <Box marginX={2}>
      <AddressCard addressIndex={addressIndex} />
      <Box width="100%" display="flex" justifyContent="center" marginTop={2}>
        <Button
          variant="contained"
          onClick={handlePrevious}
          disabled={isPreviousButtonDisabled}
          sx={{ marginRight: 2 }}
        >
          <ArrowLeft />
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
