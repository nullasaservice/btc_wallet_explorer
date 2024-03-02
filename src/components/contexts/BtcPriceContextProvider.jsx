import axios from "axios";
import React, { useEffect, useState } from "react";
import BtcPriceContext from "./BtcPriceContext";
import { Snackbar } from "@mui/material";

const BtcPriceContextProvider = ({ children }) => {
  const [btcPrice, setBtcPrice] = useState();
  const [error, setError] = useState(false);

  const getValues = async () => {
    try {
      const currencyValuesResponse = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur",
        {
          headers: {
            "x-cg-api-key": import.meta.env.COINGECKO_API_KEY,
          },
        }
      );

      setBtcPrice({
        usd: currencyValuesResponse.data.bitcoin.usd,
        eur: currencyValuesResponse.data.bitcoin.eur,
      });
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    getValues();
  }, []);

  const handleClose = () => {
    setError(false);
  };

  return (
    <BtcPriceContext.Provider value={btcPrice}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={error}
        onClose={handleClose}
        autoHideDuration={5000}
        message="Bitcoin prices could not be loaded. Refresh this page in a while to try again."
      />
    </BtcPriceContext.Provider>
  );
};

export default BtcPriceContextProvider;
