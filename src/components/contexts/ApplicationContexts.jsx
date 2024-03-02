import React from "react";
import BtcPriceContextProvider from "./BtcPriceContextProvider";
import NotificationContextProvider from "./NotificationContextProvider";

const ApplicationContexts = ({ children }) => (
  <>
    <NotificationContextProvider>
      <BtcPriceContextProvider>{children}</BtcPriceContextProvider>
    </NotificationContextProvider>
  </>
);

export default ApplicationContexts;
