package com.example.portfolio.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class StockPriceService {

    private static final String API_KEY = "UANWUIZ7SDG2ENF8";
    private static final String API_URL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=%s&apikey=" + API_KEY;

    public double getStockPrice(String ticker) {
        RestTemplate restTemplate = new RestTemplate();
        String url = String.format(API_URL, ticker);
        try {
            String response = restTemplate.getForObject(url, String.class);
            // Parse the JSON response to extract the stock price
            // Example uses a library like Jackson or Gson for parsing
            return extractPrice(response);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch stock price for " + ticker);
        }
    }

    private double extractPrice(String jsonResponse) {
        // Implement JSON parsing here to extract "05. price"
        return 0.0; // Placeholder
    }
}
