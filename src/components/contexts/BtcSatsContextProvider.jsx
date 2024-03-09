import React, { useEffect, useState } from "react";
import BtcSatsContext from "./BtcSatsContext";
import BtcSatsService from "../../services/BtcSatsService";

const BtcSatsContextProvider = ({ children }) => {
  const [showSats, setShowSats] = useState();

  useEffect(() => {
    if (showSats == null) {
      const shouldShowSats = BtcSatsService.showSats();
      setShowSats(shouldShowSats);
    }
  }, []);

  const toggleSetting = () => {
    setShowSats((b) => !b);
    BtcSatsService.toggleSetting();
  };

  return (
    <BtcSatsContext.Provider value={{ showSats, toggleSetting }}>
      {children}
    </BtcSatsContext.Provider>
  );
};

export default BtcSatsContextProvider;
