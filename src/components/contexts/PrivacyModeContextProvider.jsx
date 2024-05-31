import React, { useEffect, useState } from "react";
import PrivacyModeContext from "./PrivacyModeContext";

const LOCAL_STORAGE_KEY = "PRIVACY_MODE";

const PrivacyModeContextProvider = ({ children }) => {
  const [privacyMode, setPrivacyMode] = useState();

  useEffect(() => {
    if (privacyMode == null) {
      setPrivacyMode(isPrivacyModeEnabled());
    }
  }, []);

  const isPrivacyModeEnabled = () => {
    let privacyMode = localStorage.getItem(LOCAL_STORAGE_KEY) ?? false;

    // Already has value. Needs to parse from string into JS object.
    if (typeof privacyMode === "string") {
      privacyMode = privacyMode === "true" ? true : false;
    }

    return privacyMode;
  };

  const togglePrivacyMode = () => {
    setPrivacyMode((b) => !b);
    localStorage.setItem(LOCAL_STORAGE_KEY, !privacyMode);
  };

  return (
    <PrivacyModeContext.Provider value={{ privacyMode, togglePrivacyMode }}>
      {children}
    </PrivacyModeContext.Provider>
  );
};

export default PrivacyModeContextProvider;
