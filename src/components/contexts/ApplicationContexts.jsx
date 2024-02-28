import React from "react";
import BtcPriceContextProvider from "./BtcPriceContextProvider";

const ApplicationContexts = ({ children }) => (
  <>
    <BtcPriceContextProvider>{children}</BtcPriceContextProvider>
  </>
);

export default ApplicationContexts;
