# stockUp

![stockUp Icon](./public/favicon.ico)

stockUp is a finance and stock tracker created to help the user make smarter financial decisions.

## Technologies and Languages

- ReactJS
- React-router
- JavaScript
- Google Firebase
- CSS
- HTML5

## Usage

### Signup/Login

Users have 3 options for signing up:

- manually enter email, password, display name
- using their Google account
- using their Facebook account

### Authenticated User Features

#### Transactions

---

![Transaction list and transaction form](./public/stockUp_transaction_list.png)

- Create and view transactions with name, amount, date, category, and color
- Filter transactions to view only a specific category
- Sort transactions alphabetically, by transaction date, and by amount
- Edit/Update a transaction
- Delete transactions

#### Stocks

---

![Stock component](./public/stockUp_stock_component.png)

##### Stock Search

- Lookup pricing information and other metrics using the stock symbol
- Add stocks to watchlist
- Get suggested ticker symbols if search query doesn't match a symbol

##### Stock Watchlist

- Add stocks to watchlist with simple form inputs
- Edit/Update stock watchlist items
- Delete stocks from watchlist
- Shows stock symbol and name
- Shows gain or loss on day based on background color
- Shows percentage gained or loss for each stock
- Shows current stock prices

## Features to be implemented

- Additional metrics for transactions (total number per category, total amount, amount per month)

## License

Stock prices and information are retrieved using the [Alpha Vantage API](https://www.alphavantage.co/) and the [Finnhubb API](https://finnhub.io/docs/api).

## Disclaimer

Any suggestions or features are not financial advice, invest at your own risk.
