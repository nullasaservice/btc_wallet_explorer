import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import BtcPriceContext from "./BtcPriceContext";
import NotificationContext from "./NotificationContext";

const BtcPriceContextProvider = ({ children }) => {
  const [btcPrice, setBtcPrice] = useState();
  const setNotification = useContext(NotificationContext);

  const getValues = async () => {
    try {
      const currencyValuesResponse = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur"
      );

      setBtcPrice({
        usd: currencyValuesResponse.data.bitcoin.usd,
        eur: currencyValuesResponse.data.bitcoin.eur,
      });
    } catch (_) {
      setNotification(
        "Bitcoin prices could not be loaded. Refresh this page in a while to try again."
      );
    }
  };

  useEffect(() => {
    setNotification && getValues();
  }, [setNotification]);

  return (
    <BtcPriceContext.Provider value={btcPrice}>
      {children}
    </BtcPriceContext.Provider>
  );
};

export default BtcPriceContextProvider;
