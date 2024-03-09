import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import BtcPriceContext from "./contexts/BtcPriceContext";

const PriceCard = ({ currency }) => {
  const currencyLowercase = currency.toLowerCase();

  const { btcPrices: prices, loadingPrices } = useContext(BtcPriceContext);

  const price = prices ? prices[currencyLowercase] : undefined;

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" textAlign="center">
          BTC Price ({currency})
        </Typography>
        {loadingPrices ? (
          <Box display="flex" justifyContent="center" marginTop={1}>
            <CircularProgress />
          </Box>
        ) : (
          <Typography variant="h6" textAlign="center">
            {price}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PriceCard;
