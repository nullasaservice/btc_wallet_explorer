import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import AddressCardInfo from "../components/AddressCardInfo";
import BtcAddressesContext from "../components/contexts/BtcAddressesContext";
import DefaultPageLayout from "./DefaultPageLayout";
import CurrentBtcAddressContext from "./contexts/CurrentBtcAddressContext";

const AddressPageLayout = ({ children }) => {
  const { addressIndex } = useParams();
  const { getWithIndex } = useContext(BtcAddressesContext);
  const { fetchingAddressData } = useContext(CurrentBtcAddressContext);

  return (
    <DefaultPageLayout>
      <Card>
        <CardContent>
          <AddressCardInfo
            disablePrivacyMode
            label="Address"
            value={getWithIndex(addressIndex)}
          />
        </CardContent>
      </Card>
      {fetchingAddressData ? (
        <Box display="flex" justifyContent="center" marginTop={1}>
          <CircularProgress />
        </Box>
      ) : (
        <>{children}</>
      )}
    </DefaultPageLayout>
  );
};

export default AddressPageLayout;
