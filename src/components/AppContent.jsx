import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PriceCard from "./PriceCard";
import axios from "axios";

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const [eurValue, setEurValue] = useState();
  const [usdValue, setUsdValue] = useState();

  const getValues = async () => {
    const currencyValuesResponse = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur",
      {
        headers: {
          "x-cg-api-key": import.meta.env.COINGECKO_API_KEY,
        },
      }
    );

    setEurValue(currencyValuesResponse.data.bitcoin.eur);
    setUsdValue(currencyValuesResponse.data.bitcoin.usd);
    setLoading(false);
  };

  useEffect(() => {
    getValues();
  }, []);

  return (
    <>
      <Typography variant="h6" marginY={2}>
        BTC Wallet Explorer
      </Typography>
      <Stack direction="row" spacing={2}>
        <PriceCard currency="USD" price={usdValue} />
        <PriceCard currency="EUR" price={eurValue} />
      </Stack>
    </>
  );
};

export default AppContent;
