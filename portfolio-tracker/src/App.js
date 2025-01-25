import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import StockForm from './components/StockForm';
import StockList from './components/StockList';
import { getAllStocks } from './services/stockService';

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    const data = await getAllStocks();
    setStocks(data);
  };

  return (
    <div>
     
      <Dashboard stocks={stocks} />
      <StockForm
        onSave={loadStocks}
        selectedStock={selectedStock}
        clearSelection={() => setSelectedStock(null)}
      />
      <StockList
        stocks={stocks}
        onEdit={(stock) => setSelectedStock(stock)}
        onDelete={loadStocks}
      />
    </div>
  );
};

export default App;
