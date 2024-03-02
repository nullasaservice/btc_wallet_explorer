import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AddressesService from "../services/AddressesService";
import BtcPriceContext from "./contexts/BtcPriceContext";
import { Warning } from "@mui/icons-material";

const AddressInfo = ({ label, value }) => (
  <>
    <p>{value}</p>
    <Typography color="text.secondary" sx={{ marginTop: -2, fontSize: 14 }}>
      {label}
    </Typography>
  </>
);

const AddressCard = ({ addressIndex }) => {
  const [addressData, setAddressData] = useState();
  const [loading, setLoading] = useState(true);
  const [addressNotFound, setAddressNotFound] = useState(false);
  const btcPrices = useContext(BtcPriceContext);
  const MAX_ADDRESS_CHARACTERS = 30;

  const fetchAddressData = async () => {
    const address = AddressesService.getAddressWithIndex(addressIndex);

    try {
      const addressDataResponse = await axios.get(
        "https://blockchain.info/balance?active=" + address
      );

      // From satoshis to BTC
      const addressBalance =
        addressDataResponse.data[address]["final_balance"] / 100000000;

      const croppedAddress =
        address.length <= MAX_ADDRESS_CHARACTERS
          ? address
          : address.substring(0, MAX_ADDRESS_CHARACTERS) + "...";

      setAddressData({
        address: croppedAddress,
        balance: addressBalance,
        prices: {
          usd: btcPrices.usd * addressBalance,
          eur: btcPrices.eur * addressBalance,
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
  }, [addressIndex]);

  useEffect(() => {
    if (btcPrices) {
      fetchAddressData();
    }
  }, [addressIndex, btcPrices]);

  return (
    <Card>
      <CardContent>
        {loading ? (
          <Box display="flex" justifyContent="center" marginTop={1}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <AddressInfo
              label={`Address #${addressIndex + 1}`}
              value={addressData.address}
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
                <AddressInfo
                  label="Balance in BTC"
                  value={addressData.balance}
                />
                <AddressInfo
                  label="Balance in USD"
                  value={addressData.prices.usd}
                />
                <AddressInfo
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
