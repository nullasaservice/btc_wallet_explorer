import React, { useState } from "react";
import PrivacyModeContext from "./PrivacyModeContext";

const PrivacyModeContextProvider = ({ children }) => {
  const [privacyMode, setPrivacyMode] = useState(false);

  const togglePrivacyMode = () => {
    setPrivacyMode((b) => !b);
  };

  return (
    <PrivacyModeContext.Provider value={{ privacyMode, togglePrivacyMode }}>
      {children}
    </PrivacyModeContext.Provider>
  );
};

export default PrivacyModeContextProvider;
