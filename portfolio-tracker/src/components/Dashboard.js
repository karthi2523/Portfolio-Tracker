import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import axios from 'axios';

const Dashboard = ({ stocks }) => {
  const [topStock, setTopStock] = useState(null);
  const [totalValue, setTotalValue] = useState(0);

  const API_KEY = "cua74spr01qkpes4cacgcua74spr01qkpes4cad0"; // Finnhub API Key
  const BASE_URL = "https://finnhub.io/api/v1";

  useEffect(() => {
    const fetchStockPrices = async () => {
      let totalPortfolioValue = 0;
      const stockData = [];

      for (let stock of stocks) {
        try {
          const response = await axios.get(`${BASE_URL}/quote`, {
            params: {
              symbol: stock.ticker,
              token: API_KEY,
            },
          });

          const currentPrice = response.data.c; // Current price
          if (currentPrice) {
            const currentStockValue = stock.quantity * parseFloat(currentPrice);
            totalPortfolioValue += currentStockValue;

            stockData.push({
              ...stock,
              currentStockValue,
              currentPrice: parseFloat(currentPrice),
            });
          }
        } catch (error) {
          console.error('Error fetching stock price:', error);
        }
      }

      setTotalValue(totalPortfolioValue);

      if (stockData.length > 0) {
        const topStock = stockData.reduce(
          (max, stock) =>
            stock.currentStockValue > max.currentStockValue ? stock : max,
          stockData[0]
        );
        setTopStock(topStock);
      }
    };

    fetchStockPrices();
  }, [stocks]);

  return (
    <Box sx={{ padding: '30px', maxWidth: '1200px', margin: 'auto' }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        color="primary"
        sx={{ fontWeight: 'bold' }}
      >
        Portfolio Dashboard
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Total Portfolio Value */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={6}
            sx={{ borderRadius: '10px', '&:hover': { boxShadow: 20 } }}
          >
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Total Portfolio Value
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: 'bold' }}
                gutterBottom
              >
                ${totalValue.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Number of Stocks */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={6}
            sx={{ borderRadius: '10px', '&:hover': { boxShadow: 20 } }}
          >
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Number of Stocks
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: 'bold' }}
                gutterBottom
              >
                {stocks.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Performing Stock */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            elevation={6}
            sx={{ borderRadius: '10px', '&:hover': { boxShadow: 20 } }}
          >
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Top Performing Stock
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: 'bold' }}
                gutterBottom
              >
                {topStock
                  ? `${topStock.name} (${topStock.ticker}) - $${topStock.currentPrice.toFixed(
                      2
                    )}`
                  : 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
