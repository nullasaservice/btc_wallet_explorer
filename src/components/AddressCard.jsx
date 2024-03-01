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
  const btcPrices = useContext(BtcPriceContext);
  const MAX_ADDRESS_CHARACTERS = 30;

  const fetchAddressData = async () => {
    const address = AddressesService.getAddressWithIndex(addressIndex);

    const addressDataResponse = await axios.get(
      "https://blockchain.info/balance?active=" + address
    );

    const addressBalance =
      addressDataResponse.data[address]["final_balance"] / 100000000;

    const croppedAddress =
      address.length <= MAX_ADDRESS_CHARACTERS
        ? address
        : address.substring(0, MAX_ADDRESS_CHARACTERS) + "...";

    setAddressData({
      address: croppedAddress,
      // From satoshis to BTC
      balance: addressBalance,
      prices: {
        usd: btcPrices.usd * addressBalance,
        eur: btcPrices.eur * addressBalance,
      },
    });
  };

  useEffect(() => {
    if (btcPrices) {
      fetchAddressData();
    }
  }, [addressIndex, btcPrices]);

  return (
    <Card>
      <CardContent>
        {!addressData ? (
          <Box display="flex" justifyContent="center" marginTop={1}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <AddressInfo
              label={`Address #${addressIndex + 1}`}
              value={addressData.address}
            />
            <AddressInfo label="Balance in BTC" value={addressData.balance} />
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
      </CardContent>
    </Card>
  );
};

export default AddressCard;
