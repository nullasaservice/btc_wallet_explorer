import React, { useContext, useEffect, useState } from "react";
import CurrentBtcAddressContext from "./CurrentBtcAddressContext";
import BtcSatsContext from "./BtcSatsContext";
import axios from "axios";
import BtcAddressesContext from "./BtcAddressesContext";

export const BTC_TO_SATS = 100000000;
export const MAX_TRANSACTIONS = 10;

const CurrentBtcAddressContextProvider = ({ children }) => {
  const [fetchingAddressData, setFetchingAddressData] = useState(true);
  const [addressNotFound, setAddressNotFound] = useState(false);
  const [addressIndex, setAddressIndex] = useState(0);
  const [inputSatoshis, setInputSatoshis] = useState();
  const [outputSatoshis, setOutputSatoshis] = useState();
  const [transactions, setTransactions] = useState();
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

    const address = getWithIndex(addressIndex);

    try {
      const addressDataResponse = await axios.get(
        "https://mempool.space/api/address/" + address
      );

      setInputSatoshis(addressDataResponse?.data?.chain_stats?.funded_txo_sum);
      setOutputSatoshis(addressDataResponse?.data?.chain_stats?.spent_txo_sum);

      const addressTransactionsResponse = await axios.get(
        `https://mempool.space/api/address/${address}/txs`
      );

      const latestAddressTransactions = addressTransactionsResponse.data.slice(
        0,
        MAX_TRANSACTIONS
      );

      const processedTransactions = latestAddressTransactions.map(
        (transaction) => {
          let amount;

          const isInbound = transaction.vout.some((elem) => {
            if (elem.scriptpubkey_address === address) {
              amount = elem.value;
              return true;
            }

            return false;
          });

          const isOutbound = transaction.vin.some((elem) => {
            if (elem.prevout.scriptpubkey_address === address) {
              amount = elem.prevout.value;
              return true;
            }

            return false;
          });

          if (isInbound && isOutbound)
            throw new Error("Inbound and outbound tx found");
          if (!isInbound && !isOutbound)
            throw new Error("Tx without type found");

          return {
            confirmed: transaction.status.confirmed,
            createdAt: transaction.status.block_time,
            isInbound,
            isOutbound,
            amount,
          };
        }
      );

      setTransactions(processedTransactions);
    } catch (err) {
      if (err?.response?.status === 400) {
        setAddressNotFound(true);
      } else {
        console.error(err);
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
        transactions,
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
