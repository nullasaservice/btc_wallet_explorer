import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import BtcPriceContext from "./contexts/BtcPriceContext";
import { Warning } from "@mui/icons-material";
import AddressCardInfo from "./AddressCardInfo";
import BtcSatsContext from "./contexts/BtcSatsContext";

const AddressCard = ({ index, address }) => {
  const MAX_ADDRESS_CHARACTERS = 25;
  const BTC_TO_SATS = 100000000;

  const [addressData, setAddressData] = useState();
  const [loading, setLoading] = useState(true);
  const [addressNotFound, setAddressNotFound] = useState(false);
  const [showFullAddress, setShowFullAddress] = useState(false);
  const btcPrices = useContext(BtcPriceContext);
  const { showSats } = useContext(BtcSatsContext);

  const addressTooLong = address.length > MAX_ADDRESS_CHARACTERS;

  const handleFullAddress = () => {
    setShowFullAddress((b) => !b);
  };

  const fetchAddressData = async () => {
    try {
      const addressDataResponse = await axios.get(
        "https://blockchain.info/balance?active=" + address
      );

      // Balance comes in Satoshis
      const balance =
        addressDataResponse.data[address]["final_balance"] / BTC_TO_SATS;

      const croppedAddress = !addressTooLong
        ? address
        : address.substring(0, MAX_ADDRESS_CHARACTERS);

      setAddressData({
        address: croppedAddress,
        balance: showSats ? balance * BTC_TO_SATS : balance,
        prices: {
          usd: btcPrices.usd * balance,
          eur: btcPrices.eur * balance,
        },
      });
    } catch (err) {
      if (err?.response?.status === 400) {
        setAddressData({ address });
        setAddressNotFound(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setAddressNotFound(false);
  }, [index, address]);

  useEffect(() => {
    if (btcPrices) {
      fetchAddressData();
    }
  }, [index, address, btcPrices]);

  return (
    <Card>
      <CardContent>
        {loading ? (
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
                    {addressData.address}...
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
                  value={addressData.balance}
                />
                <AddressCardInfo
                  label="Balance in USD"
                  value={addressData.prices.usd}
                />
                <AddressCardInfo
                  label="Balance in EUR"
                  value={addressData.prices.eur}
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
