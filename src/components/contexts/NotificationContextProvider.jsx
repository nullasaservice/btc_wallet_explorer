import React, { useState } from "react";
import NotificationContext from "./NotificationContext";
import { Snackbar } from "@mui/material";

const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState();

  const handleClose = () => {
    setNotification();
  };

  return (
    <NotificationContext.Provider value={setNotification}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={notification != null}
        onClose={handleClose}
        autoHideDuration={5000}
        message={notification}
      />
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
