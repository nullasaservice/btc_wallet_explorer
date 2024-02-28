import axios from "axios";
import React, { useEffect, useState } from "react";
import BtcPriceContext from "./BtcPriceContext";

const BtcPriceContextProvider = ({ children }) => {
  const [btcPrice, setBtcPrice] = useState();

  const getValues = async () => {
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
  };

  useEffect(() => {
    getValues();
  }, []);

  return (
    <BtcPriceContext.Provider value={btcPrice}>
      {children}
    </BtcPriceContext.Provider>
  );
};

export default BtcPriceContextProvider;
