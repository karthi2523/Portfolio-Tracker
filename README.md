# Portfolio Tracker Application

This is a **Portfolio Tracker Application** that allows users to track their investment portfolio. The application consists of a backend built using Spring Boot and a React frontend. The backend provides APIs to fetch stock-related data, while the frontend allows users to interact with the platform.

---

## Features

- Fetch real-time stock data using Finnhub API.
- User-friendly interface for tracking investments.
- Integration of backend and frontend for smooth communication.
- Deployed on platforms like **Vercel**, **Netlify**, and **AWS**.

---

## Technologies Used

### Frontend
- **React**: Frontend library for building user interfaces.
- **Material-UI**: For elegant and responsive UI components.

### Backend
- **Spring Boot**: Backend framework for building REST APIs.
- **MySQL**: Database for storing portfolio data.
- **Finnhub API**: For fetching stock market data.

### Deployment
- Frontend: **Vercel** or **Netlify**
- Backend: **AWS**, **Heroku**, or similar platforms.

---

## Prerequisites

- **Node.js** (v18 or higher)
- **Java 11/17** for Spring Boot
- **MySQL** for database
- API key from [Finnhub](https://finnhub.io/)

---

## Installation and Setup

### Backend
1. Clone the backend repository:
   ```bash
   git clone <backend-repo-url>
   cd portfolio_backend
application.properties:

spring.datasource.url=jdbc:mysql://<your-database-url>:3306/portfolio_db
spring.datasource.username=<your-db-username>
spring.datasource.password=<your-db-password>

finnhub.api.key=<your-finnhub-api-key>


mvn clean install
mvn spring-boot:run

git clone <frontend-repo-url>
cd portfolio_frontend

REACT_APP_API_URL=https://your-backend-url.com/api

npm install

npm start

npm run build


Troubleshooting

CORS Issues: Enable CORS in the backend to allow requests from the frontend domain.
Environment Variables: Ensure environment variables are correctly configured for both frontend and backend.
API Connectivity: Test backend endpoints with tools like Postman to ensure they’re accessible.

Contact
For any questions or feedback, feel free to reach out:

Email: athletefalcon1718@gmail.com
Instagram: Mobile Shop
vbnet
Copy
Edit

Let me know if you'd like to add anything specific or modify it further!
