import { Card, CardContent, Link, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditAddressModal from "../components/EditAddressModal";
import BtcAddressesContext from "../components/contexts/BtcAddressesContext";
import DeleteAddressModal from "../components/DeleteAddressModal";
import { Link as LinkIcon, OpenInNew } from "@mui/icons-material";
import AddressSummaryModal from "../components/AddressSummaryModal";
import ActionButton from "../components/ActionButton";

const AddressPage = () => {
  const navigate = useNavigate();
  const { addressIndex } = useParams();
  const { getWithIndex } = useContext(BtcAddressesContext);

  const goToTransactionsPage = () =>
    navigate(`/addresses/${addressIndex}/transactions`);

  return (
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        <Stack justifyContent="center" spacing={2}>
          <Typography variant="h6">Actions</Typography>
          <AddressSummaryModal />
          <ActionButton
            onClick={goToTransactionsPage}
            icon={<LinkIcon />}
            text="Show transactions"
            color="warning"
          />
          <EditAddressModal />
          <DeleteAddressModal />
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
  );
};

export default AddressPage;
