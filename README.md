# Bangladesh Stock Market Data API - 

This is an unofficial api which crawls data from dsebd. Please report issue if data not coming in. I'll try to lookup.

[x] - Dhaka Stock Exchange

[ ] - Chittagong Stock Exchange

[ ] - Logging, DB support

[ ] - Validation, Environment variable
## API Routes

### 1. Latest Stock Data
- **Endpoint:** `GET /v1/price/stockdata`
- **Description:** Retrieves the latest stock market data.
- **Parameters:** None

### 2. DSEX Data
- **Endpoint:** `GET /v1/price/dsexdata`
- **Description:** Fetches DSEX (Dhaka Stock Exchange) data.
- **Optional Parameters:**
  - `symbol` (string): Filter data for a specific stock symbol.
  - `retryCount` (number): Number of retry attempts for the request.
  - `pause` (number): Pause duration between retries in seconds.

### #. Historical Stock Data
- **Endpoint:** `GET /v1/price/histdata`
- **Description:** Obtains historical data for stocks.
- **Required Parameters:**
  - `start` (string): Start date for the historical data.
  - `end` (string): End date for the historical data.
  - `code` (string): Specific instrument code.
  

## Data Fields Description

Each stock data object in the response represents a player in the stock market game. Here's what each field tells us about its performance:


- `TRADING CODE`: The unique identifier of the stock in the market.
- `LTP*` (Last Traded Price): **The Current Score** - The latest price at which the stock was traded.
- `HIGH`:  The highest price at which the stock traded for the day.
- `LOW`: The lowest price for the stock in the day.
- `CLOSEP*` (Closing Price): The price at which the stock ended the trading day.
- `YCP*` (Yesterday's Closing Price): **Yesterday's Score** - The final score from the previous day.
- `CHANGE`: How much the stock has gained or lost compared to the previous day.
- `TRADE`: Total number of trades for the stock.
- `VALUE (mn)`: Total monetary value of all trades in millions.
- `VOLUME`: The total number of shares that were traded.

