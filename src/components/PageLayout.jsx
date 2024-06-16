import React from "react";
import AppHeader from "./AppHeader";

const PageLayout = ({ children }) => (
  <>
    <AppHeader />
    {children}
  </>
);

export default PageLayout;
