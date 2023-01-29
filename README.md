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

- Lookup pricing information and other metrics using the stock symbol
- Add stocks to watchlist
- Edit/Update stock watchlist items
- Delete stocks from watchlist
- Get suggested ticker symbols if search query doesn't match a symbol

## Features to be implemented

- Additional metrics for transactions (total number per category, total amount, amount per month)
- Conditionally showing user stock details if the stock is up

## License

Stock prices and information are retrieved using the [Alpha Vantage API](https://www.alphavantage.co/).

## Disclaimer

Any suggestions or features are not financial advice, invest at your own risk.
