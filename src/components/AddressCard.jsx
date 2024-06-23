import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import BtcPriceContext from "./contexts/BtcPriceContext";
import { Warning } from "@mui/icons-material";
import AddressCardInfo from "./AddressCardInfo";
import BtcSatsContext from "./contexts/BtcSatsContext";
import CurrentBtcAddressContext from "./contexts/CurrentBtcAddressContext";

const MAX_ADDRESS_CHARACTERS = 25;

const AddressCard = ({ index, address }) => {
  const [showFullAddress, setShowFullAddress] = useState(false);
  const { btcPrices } = useContext(BtcPriceContext);
  const { showSats } = useContext(BtcSatsContext);
  const { fetchingAddressData, addressNotFound, getCurrentBalance } =
    useContext(CurrentBtcAddressContext);

  const addressTooLong = address.length > MAX_ADDRESS_CHARACTERS;

  const croppedAddress = !addressTooLong
    ? address
    : address.substring(0, MAX_ADDRESS_CHARACTERS);

  const handleFullAddress = () => {
    setShowFullAddress((b) => !b);
  };

  return (
    <Card>
      <CardContent>
        {fetchingAddressData ? (
          <Box display="flex" justifyContent="center" marginTop={1}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <AddressCardInfo
              label={`Address #${index + 1}`}
              value={
                !addressTooLong ? (
                  address
                ) : (
                  <Box>
                    {croppedAddress}...
                    <Button
                      variant="contained"
                      onClick={handleFullAddress}
                      sx={{
                        maxHeight: "15px",
                        minWidth: "5px",
                        maxWidth: "5px",
                        backgroundColor: "#797a7a",
                        color: "#fff",
                        marginLeft: 1,
                      }}
                    >
                      ···
                    </Button>
                    {showFullAddress && (
                      <Typography sx={{ marginTop: -0.5 }}>
                        ...
                        {address.substring(
                          MAX_ADDRESS_CHARACTERS,
                          address.length
                        )}
                      </Typography>
                    )}
                  </Box>
                )
              }
            />
            {addressNotFound ? (
              <>
                <Box
                  display="flex"
                  width="100%"
                  justifyContent="center"
                  marginTop={2}
                  marginBottom={-2}
                >
                  <Warning color="warning" fontSize="large" />
                </Box>
                <p>Info for this address could not be found.</p>
              </>
            ) : (
              <>
                <AddressCardInfo
                  label={"Balance in " + (showSats ? "sats" : "BTC")}
                  value={getCurrentBalance()}
                />
                <AddressCardInfo
                  label="Balance in USD"
                  value={getCurrentBalance() * btcPrices.usd}
                />
                <AddressCardInfo
                  label="Balance in EUR"
                  value={getCurrentBalance() * btcPrices.eur}
                />
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressCard;
