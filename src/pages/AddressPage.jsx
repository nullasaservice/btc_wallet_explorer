import {
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import AddressCardInfo from "../components/AddressCardInfo";
import EditAddressModal from "../components/EditAddressModal";
import BtcAddressesContext from "../components/contexts/BtcAddressesContext";
import DeleteAddressButton from "../components/DeleteAddressButton";
import { OpenInNew } from "@mui/icons-material";

const AddressPage = () => {
  const { addressIndex } = useParams();
  const { getWithIndex } = useContext(BtcAddressesContext);

  return (
    <>
      <Card>
        <CardContent>
          <AddressCardInfo
            disablePrivacyMode
            label="Address"
            value={getWithIndex(addressIndex)}
          />
        </CardContent>
      </Card>
      <Card sx={{ marginTop: 2 }}>
        <CardContent>
          <Stack justifyContent="center" spacing={2}>
            <Typography variant="h6">Actions</Typography>
            <EditAddressModal />
            <DeleteAddressButton />
            <Typography>
              Check more about this address on{" "}
              <Link
                target="_blank"
                rel="noreferrer"
                href={`https://mempool.space/address/${getWithIndex(addressIndex)}`}
              >
                <Stack alignItems="center" direction="row">
                  <u>mempool.space</u>
                  <OpenInNew fontSize="small" />
                </Stack>
              </Link>
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default AddressPage;
