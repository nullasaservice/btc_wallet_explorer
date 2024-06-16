import React from "react";
import BtcPriceContextProvider from "./BtcPriceContextProvider";
import NotificationContextProvider from "./NotificationContextProvider";
import PrivacyModeContextProvider from "./PrivacyModeContextProvider";
import BtcSatsContextProvider from "./BtcSatsContextProvider";
import BtcAddressesContextProvider from "./BtcAddressesContextProvider";
import CurrentBtcAddressContextProvider from "./CurrentBtcAddressContextProvider";

const ApplicationContexts = ({ children }) => (
  <NotificationContextProvider>
    <PrivacyModeContextProvider>
      <BtcPriceContextProvider>
        <BtcSatsContextProvider>
          <BtcAddressesContextProvider>
            <CurrentBtcAddressContextProvider>
              {children}
            </CurrentBtcAddressContextProvider>
          </BtcAddressesContextProvider>
        </BtcSatsContextProvider>
      </BtcPriceContextProvider>
    </PrivacyModeContextProvider>
  </NotificationContextProvider>
);

export default ApplicationContexts;
