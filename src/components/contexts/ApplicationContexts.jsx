import React from "react";
import BtcPriceContextProvider from "./BtcPriceContextProvider";
import NotificationContextProvider from "./NotificationContextProvider";
import PrivacyModeContextProvider from "./PrivacyModeContextProvider";
import BtcSatsContextProvider from "./BtcSatsContextProvider";

const ApplicationContexts = ({ children }) => (
  <>
    <NotificationContextProvider>
      <PrivacyModeContextProvider>
        <BtcPriceContextProvider>
          <BtcSatsContextProvider>{children}</BtcSatsContextProvider>
        </BtcPriceContextProvider>
      </PrivacyModeContextProvider>
    </NotificationContextProvider>
  </>
);

export default ApplicationContexts;
