import React, { useEffect, useState } from "react";
import PrivacyModeContext from "./PrivacyModeContext";
import PrivacyModeService from "../../services/PrivacyModeService";

const PrivacyModeContextProvider = ({ children }) => {
  const [privacyMode, setPrivacyMode] = useState();

  useEffect(() => {
    if (privacyMode == null) {
      const isEnabled = PrivacyModeService.isEnabled();
      setPrivacyMode(isEnabled);
    }
  }, []);

  const togglePrivacyMode = () => {
    setPrivacyMode((b) => !b);
    PrivacyModeService.toggleSetting();
  };

  return (
    <PrivacyModeContext.Provider value={{ privacyMode, togglePrivacyMode }}>
      {children}
    </PrivacyModeContext.Provider>
  );
};

export default PrivacyModeContextProvider;
