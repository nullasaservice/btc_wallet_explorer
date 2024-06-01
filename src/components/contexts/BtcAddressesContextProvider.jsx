import { useEffect, useState } from "react";
import BtcAddressesContext from "./BtcAddressesContext";

const LOCAL_STORAGE_KEY = "ADDRESSES";

const BtcAddressesContextProvider = ({ children }) => {
  const [btcAddresses, setBtcAddresses] = useState([]);

  useEffect(() => {
    setBtcAddresses(parseAddresses());
  }, []);

  const parseAddresses = () => {
    let addresses = localStorage.getItem(LOCAL_STORAGE_KEY) ?? [];

    // Already has value. Needs to parse from string into JS object.
    if (typeof addresses === "string") {
      addresses = JSON.parse(addresses);
    }

    return addresses;
  };

  const getCount = () => btcAddresses.length;

  const isEmpty = () => getCount() === 0;

  const save = (addresses) => {
    setBtcAddresses(addresses);

    const stringifiedJson = JSON.stringify(addresses);

    localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedJson);
  };

  const addNewAddress = (address) => {
    const addresses = [...btcAddresses, address];

    save(addresses);
  };

  const addNewAddressAtIndex = (index, address) => {
    const addresses = Array.from(btcAddresses);

    addresses[index] = address;

    save(addresses);
  };

  const removeAddressAtIndex = (index) => {
    const addresses = Array.from(btcAddresses);
    const newAddresses = addresses.toSpliced(index, 1);

    save(newAddresses);
  };

  const getWithIndex = (index) => btcAddresses.at(index);

  return (
    <BtcAddressesContext.Provider
      value={{
        btcAddresses,
        getCount,
        isEmpty,
        addNewAddress,
        addNewAddressAtIndex,
        removeAddressAtIndex,
        getWithIndex,
      }}
    >
      {children}
    </BtcAddressesContext.Provider>
  );
};

export default BtcAddressesContextProvider;
