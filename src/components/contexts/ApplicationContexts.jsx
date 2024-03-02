import React from "react";
import BtcPriceContextProvider from "./BtcPriceContextProvider";
import NotificationContextProvider from "./NotificationContextProvider";
import PrivacyModeContextProvider from "./PrivacyModeContextProvider";

const ApplicationContexts = ({ children }) => (
  <>
    <NotificationContextProvider>
      <PrivacyModeContextProvider>
        <BtcPriceContextProvider>{children}</BtcPriceContextProvider>
      </PrivacyModeContextProvider>
    </NotificationContextProvider>
  </>
);

export default ApplicationContexts;
