package com.example.portfolio.service;

import com.example.portfolio.model.Stock;
import com.example.portfolio.repository.StockRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {

    private final StockRepository stockRepository;

    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Stock getStockById(Long id) {
        return stockRepository.findById(id).orElseThrow(() -> new RuntimeException("Stock not found"));
    }

    public Stock addStock(Stock stock) {
        return stockRepository.save(stock);
    }

    public Stock updateStock(Long id, Stock updatedStock) {
        Stock stock = getStockById(id);
        stock.setName(updatedStock.getName());
        stock.setTicker(updatedStock.getTicker());
        stock.setQuantity(updatedStock.getQuantity());
        stock.setBuyPrice(updatedStock.getBuyPrice());
        return stockRepository.save(stock);
    }

    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }
}
