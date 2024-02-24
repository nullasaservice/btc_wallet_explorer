import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import React from "react";

const PriceCard = ({ currency, price }) => (
  <Card>
    <CardContent>
      <Typography variant="subtitle1" textAlign="center">
        BTC Price ({currency})
      </Typography>
      {price == null ? (
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

export default PriceCard;
