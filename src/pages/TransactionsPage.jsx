import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import {
  BTC_TO_SATS,
  MAX_TRANSACTIONS,
} from "../components/contexts/CurrentBtcAddressContextProvider";
import CurrentBtcAddressContext from "../components/contexts/CurrentBtcAddressContext";
import { CheckBox, Input, Output, Warning } from "@mui/icons-material";
import BtcSatsContext from "../components/contexts/BtcSatsContext";

const TransactionsPage = () => {
  const { transactions } = useContext(CurrentBtcAddressContext);
  const { showSats } = useContext(BtcSatsContext);

  console.log(transactions);

  return (
    <Stack spacing={2} marginTop={2}>
      <Typography>
        Listing the latest {MAX_TRANSACTIONS} for selected address:
      </Typography>
      <Box sx={{ height: "60vh", overflow: "auto" }}>
        {transactions.map((transaction, index) => {
          const amountString = showSats
            ? `${transaction.amount} sats`
            : `${transaction.amount / BTC_TO_SATS} BTC`;

          return (
            <Card key={index} sx={{ marginTop: index === 0 ? 0 : 2 }}>
              <CardContent>
                <Stack spacing={2}>
                  <Box display="flex" justifyContent="center">
                    {transaction.isInbound && <Input color="success" />}
                    {transaction.isOutbound && <Output color="error" />}
                  </Box>
                  <Typography display="flex" alignItems="center">
                    {transaction.confirmed ? (
                      <>
                        <CheckBox color="success" sx={{ marginRight: 1 }} />{" "}
                        Confirmed
                      </>
                    ) : (
                      <>
                        <Warning color="warning" sx={{ marginRight: 1 }} />{" "}
                        Unconfirmed
                      </>
                    )}{" "}
                    transaction
                  </Typography>
                  <Typography>Amount: {amountString}</Typography>
                  {transaction.confirmed && (
                    <Typography>
                      Confirmed at{" "}
                      {new Date(transaction.createdAt * 1000).toLocaleString()}.
                    </Typography>
                  )}
                </Stack>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Stack>
  );
};

export default TransactionsPage;
