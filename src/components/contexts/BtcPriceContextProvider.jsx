import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import BtcPriceContext from "./BtcPriceContext";
import NotificationContext from "./NotificationContext";

const BtcPriceContextProvider = ({ children }) => {
  const [btcPrices, setBtcPrices] = useState();
  const [loadingPrices, setLoadingPrices] = useState(true);
  const setNotification = useContext(NotificationContext);

  const fetchPrices = async () => {
    try {
      const currencyValuesResponse = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,eur"
      );

      setBtcPrices({
        usd: currencyValuesResponse.data.bitcoin.usd,
        eur: currencyValuesResponse.data.bitcoin.eur,
      });
      setLoadingPrices(false);
    } catch (_) {
      setNotification(
        "Bitcoin prices could not be loaded. Refresh this page in a while to try again."
      );
    }
  };

  const refreshPrices = () => {
    setLoadingPrices(true);
    fetchPrices();
  };

  useEffect(() => {
    setNotification && fetchPrices();
  }, [setNotification]);

  return (
    <BtcPriceContext.Provider
      value={{ btcPrices, loadingPrices, refreshPrices }}
    >
      {children}
    </BtcPriceContext.Provider>
  );
};

export default BtcPriceContextProvider;
