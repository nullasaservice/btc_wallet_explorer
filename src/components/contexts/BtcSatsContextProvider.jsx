import React, { useEffect, useState } from "react";
import BtcSatsContext from "./BtcSatsContext";

const LOCAL_STORAGE_KEY = "SHOW_SATS";

const BtcSatsContextProvider = ({ children }) => {
  const [showSats, setShowSats] = useState();

  useEffect(() => {
    if (showSats == null) {
      setShowSats(shouldShowSats());
    }
  }, []);

  const shouldShowSats = () => {
    let showSats = localStorage.getItem(LOCAL_STORAGE_KEY) ?? false;

    // Already has value. Needs to parse from string into JS object.
    if (typeof showSats === "string") {
      showSats = showSats === "true" ? true : false;
    }

    return showSats;
  };

  const toggleSetting = () => {
    setShowSats((b) => !b);

    localStorage.setItem(LOCAL_STORAGE_KEY, !showSats);
  };

  return (
    <BtcSatsContext.Provider value={{ showSats, toggleSetting }}>
      {children}
    </BtcSatsContext.Provider>
  );
};

export default BtcSatsContextProvider;
