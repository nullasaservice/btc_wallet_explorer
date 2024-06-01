import React from "react";
import BtcPriceContextProvider from "./BtcPriceContextProvider";
import NotificationContextProvider from "./NotificationContextProvider";
import PrivacyModeContextProvider from "./PrivacyModeContextProvider";
import BtcSatsContextProvider from "./BtcSatsContextProvider";
import BtcAddressesContextProvider from "./BtcAddressesContextProvider";

const ApplicationContexts = ({ children }) => (
  <>
    <NotificationContextProvider>
      <PrivacyModeContextProvider>
        <BtcPriceContextProvider>
          <BtcSatsContextProvider>
            <BtcAddressesContextProvider>
              {children}
            </BtcAddressesContextProvider>
          </BtcSatsContextProvider>
        </BtcPriceContextProvider>
      </PrivacyModeContextProvider>
    </NotificationContextProvider>
  </>
);

export default ApplicationContexts;
