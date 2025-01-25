import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { deleteStock, updateStock } from '../services/stockService';

const StockList = ({ stocks, onEdit, onDelete }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
  const [editedStock, setEditedStock] = useState({ name: '', ticker: '', quantity: 0, buyPrice: 0 });
  const [stockPrices, setStockPrices] = useState({});
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);

  const API_KEY = "cua74spr01qkpes4cacgcua74spr01qkpes4cad0";
  const BASE_URL = "https://finnhub.io/api/v1";

  // Fetch current stock prices from Finnhub API
  useEffect(() => {
    const fetchStockPrices = async () => {
      const priceData = {};
      for (let stock of stocks) {
        try {
          const response = await axios.get(`${BASE_URL}/quote`, {
            params: {
              symbol: stock.ticker,
              token: API_KEY,
            },
          });
          const price = response.data.c; // Current price
          if (price) {
            priceData[stock.ticker] = parseFloat(price);
          }
        } catch (error) {
          console.error('Error fetching stock price:', error);
        }
      }
      setStockPrices(priceData);
    };

    fetchStockPrices();
  }, [stocks]);

  // Calculate portfolio value based on current stock prices
  useEffect(() => {
    const calculatePortfolioValue = () => {
      let total = 0;

      stocks.forEach((stock) => {
        const currentPrice = stockPrices[stock.ticker] || stock.buyPrice;
        total += stock.quantity * currentPrice;
      });

      setTotalPortfolioValue(total);
    };

    calculatePortfolioValue();
  }, [stocks, stockPrices]);

  const handleDelete = async (id) => {
    await deleteStock(id);
    onDelete();
  };

  const handleEditOpen = (stock) => {
    setEditingStock(stock);
    setEditedStock({ ...stock });
    setOpenEditDialog(true);
  };

  const handleEditClose = () => {
    setOpenEditDialog(false);
  };

  const handleEditSubmit = async () => {
    await updateStock(editingStock.id, editedStock);
    onEdit();
    setOpenEditDialog(false);

    window.location.reload();
  };

  const handleEditedStockChange = (e) => {
    const { name, value } = e.target;
    setEditedStock({ ...editedStock, [name]: value });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary" style={{ marginBottom: '30px' }}>
        Portfolio Stock List
      </Typography>

      {/* Portfolio Value */}
      <Typography variant="h6" align="center" color="textSecondary" style={{ marginBottom: '20px' }}>
        Total Portfolio Value: ${totalPortfolioValue.toFixed(2)}
      </Typography>

      <TableContainer component={Paper} style={{ marginBottom: '30px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Stock Name</strong></TableCell>
              <TableCell><strong>Ticker</strong></TableCell>
              <TableCell><strong>Quantity</strong></TableCell>
              <TableCell><strong>Buy Price</strong></TableCell>
              <TableCell><strong>Current Price</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell>{stock.name}</TableCell>
                <TableCell>{stock.ticker}</TableCell>
                <TableCell>{stock.quantity}</TableCell>
                <TableCell>${stock.buyPrice.toFixed(2)}</TableCell>
                <TableCell>
                  ${stockPrices[stock.ticker] ? stockPrices[stock.ticker].toFixed(2) : 'N/A'}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditOpen(stock)}
                    style={{ marginRight: '10px' }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(stock.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEditDialog} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Stock</DialogTitle>
        <DialogContent>
          <TextField
            label="Stock Name"
            name="name"
            value={editedStock.name}
            onChange={handleEditedStockChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Ticker"
            name="ticker"
            value={editedStock.ticker}
            onChange={handleEditedStockChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={editedStock.quantity}
            onChange={handleEditedStockChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Buy Price"
            name="buyPrice"
            type="number"
            value={editedStock.buyPrice}
            onChange={handleEditedStockChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">Cancel</Button>
          <Button onClick={handleEditSubmit} color="primary" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StockList;
