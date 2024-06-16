import React, { useContext, useEffect, useState } from "react";
import CurrentBtcAddressContext from "./CurrentBtcAddressContext";
import BtcSatsContext from "./BtcSatsContext";
import axios from "axios";
import BtcAddressesContext from "./BtcAddressesContext";

const BTC_TO_SATS = 100000000;

const CurrentBtcAddressContextProvider = ({ children }) => {
  const [fetchingAddressData, setFetchingAddressData] = useState(true);
  const [addressNotFound, setAddressNotFound] = useState(false);
  const [addressIndex, setAddressIndex] = useState(0);
  const [inputSatoshis, setInputSatoshis] = useState();
  const [outputSatoshis, setOutputSatoshis] = useState();
  const { showSats } = useContext(BtcSatsContext);
  const { isReady, getWithIndex } = useContext(BtcAddressesContext);

  const getInputBalance = () =>
    showSats ? inputSatoshis : inputSatoshis / BTC_TO_SATS;

  const getOutputBalance = () =>
    showSats ? outputSatoshis : outputSatoshis / BTC_TO_SATS;

  const getCurrentBalance = () => {
    const currentSatoshis = inputSatoshis - outputSatoshis;

    return showSats ? currentSatoshis : currentSatoshis / BTC_TO_SATS;
  };

  const fetchData = async () => {
    setFetchingAddressData(true);
    setAddressNotFound(false);

    try {
      const addressDataResponse = await axios.get(
        "https://mempool.space/api/address/" + getWithIndex(addressIndex)
      );

      setInputSatoshis(addressDataResponse?.data?.chain_stats?.funded_txo_sum);
      setOutputSatoshis(addressDataResponse?.data?.chain_stats?.spent_txo_sum);
    } catch (err) {
      if (err?.response?.status === 400) {
        setAddressNotFound(true);
      }
    } finally {
      setFetchingAddressData(false);
    }
  };

  useEffect(() => {
    isReady && fetchData();
  }, [addressIndex, isReady]);

  return (
    <CurrentBtcAddressContext.Provider
      value={{
        fetchingAddressData,
        addressNotFound,
        addressIndex,
        setAddressIndex,
        getInputBalance,
        getOutputBalance,
        getCurrentBalance,
      }}
    >
      {children}
    </CurrentBtcAddressContext.Provider>
  );
};

export default CurrentBtcAddressContextProvider;
