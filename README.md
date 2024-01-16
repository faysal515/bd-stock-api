# Bangladesh Stock Market Data API - 

This is an unofficial api which crawls data from dsebd. Please report issue if data not coming in. I'll try to lookup.

- [x] Dhaka Stock Exchange

- [ ] Chittagong Stock Exchange

- [ ] Logging, DB support

- [ ] Validation
## API Routes

### 1. Latest Stock Data
- **Endpoint:** `GET /v1/dse/latest`
- **Description:** Retrieves the latest stock market data.
- **Parameters:** None

### 2. TOP 30 Stock Data
- **Endpoint:** `GET /v1/dse/top30`
- **Description:** Retrieves the latest top 30 stock market data.
- **Parameters:** None

### 3. DSEX Data
- **Endpoint:** `GET /v1/dse/dsexdata`
- **Description:** Fetches DSEX (Dhaka Stock Exchange) data.
- **Optional Parameters:**
  - `symbol` (string): Filter data for a specific stock symbol.

### 4. Historical Stock Data
- **Endpoint:** `GET /v1/dse/historical`
- **Description:** Obtains historical data for stocks.
- **Required Parameters:**
  - `start` (string): Start date for the historical data.
  - `end` (string): End date for the historical data.
  - `code` (string): Specific instrument code.
  

## Data Fields Description

- `TRADING CODE`: The unique identifier of the stock in the market.
- `LTP*` (Last Traded Price): **The Current Score** - The latest price at which the stock was traded.
- `HIGH`:  The highest price at which the stock traded for the day.
- `LOW`: The lowest price for the stock in the day.
- `CLOSEP*` (Closing Price): The price at which the stock ended the trading day.
- `YCP*` (Yesterday's Closing Price)
- `CHANGE`: How much the stock has gained or lost compared to the previous day.
- `TRADE`: Total number of trades for the stock.
- `VALUE (mn)`: Total monetary value of all trades in millions.
- `VOLUME`: The total number of shares that were traded.

