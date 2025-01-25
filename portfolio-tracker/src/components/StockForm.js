import React, { useState, useEffect, useCallback } from 'react';
import { addStock, updateStock } from '../services/stockService';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import axios from 'axios';

const StockForm = ({ onSave, selectedStock, clearSelection }) => {
  const [form, setForm] = useState({ name: '', ticker: '', quantity: 0, buyPrice: 0 });
  const [isFetchingTicker, setIsFetchingTicker] = useState(false);
  const [error, setError] = useState('');

  const FINNHUB_API_KEY = 'cua74spr01qkpes4cacgcua74spr01qkpes4cad0'; // Replace with your Finnhub API key.

  const fetchTicker = useCallback(
    async (stockName) => {
      setIsFetchingTicker(true);
      setError('');

      try {
        const response = await axios.get('https://finnhub.io/api/v1/search', {
          params: {
            q: stockName,
            token: FINNHUB_API_KEY,
          },
        });

        const result = response.data.result;
        if (result && result.length > 0) {
          const matchedStock = result[0];
          setForm((prevForm) => ({ ...prevForm, ticker: matchedStock.symbol }));
        } else {
          setError('No matching ticker found for the entered stock name.');
        }
      } catch (error) {
        setError('Error fetching ticker symbol. Please try again later.');
      }

      setIsFetchingTicker(false);
    },
    [FINNHUB_API_KEY]
  );

  useEffect(() => {
    if (selectedStock) {
      setForm(selectedStock);
    }
  }, [selectedStock]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Automatically fetch ticker when stock name changes
    if (name === 'name' && value.trim().length > 0) {
      fetchTicker(value.trim());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStock) {
      await updateStock(selectedStock.id, form);
    } else {
      await addStock(form);
    }
    setForm({ name: '', ticker: '', quantity: 1, buyPrice: 0 });
    clearSelection();
    onSave();
  };

  return (
    <Paper
      sx={{
        padding: 3,
        maxWidth: 450,
        margin: 'auto',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        backgroundColor: '#fff',
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: 3, textAlign: 'center', color: '#3f51b5' }}
      >
        {selectedStock ? 'Edit Stock' : 'Add Stock'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Stock Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              variant="outlined"
              required
              sx={{ marginBottom: 2 }}
              helperText={isFetchingTicker ? 'Fetching ticker...' : error}
              error={!!error}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ticker"
              name="ticker"
              value={form.ticker}
              onChange={handleChange}
              variant="outlined"
              required
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              variant="outlined"
              type="number"
              required
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Buy Price"
              name="buyPrice"
              value={form.buyPrice}
              onChange={handleChange}
              variant="outlined"
              type="number"
              required
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{
                marginTop: 3,
                padding: 1.5,
                backgroundColor: '#3f51b5',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
              }}
              fullWidth
              type="submit"
            >
              {selectedStock ? 'Update Stock' : 'Add Stock'}
            </Button>
          </Grid>
          {selectedStock && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  marginTop: 1,
                  padding: 1.5,
                  backgroundColor: '#f44336',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#d32f2f',
                  },
                }}
                fullWidth
                onClick={clearSelection}
              >
                Cancel
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};

export default StockForm;
