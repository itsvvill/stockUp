# stockUp

![stockUp Icon](./public/favicon.ico)

stockUp is a finance and stock tracker created to help the user make smarter financial decisions.

## Table of Contents

- [Technologies and Languages](https://github.com/itsvvill/stockUp/edit/main/README.md#technologies-and-languages)
- [Usage](https://github.com/itsvvill/stockUp/edit/main/README.md#Usage)
  - [Signup/Login](https://github.com/itsvvill/stockUp/edit/main/README.md#signuplogin)
  - [Authenticated User Features](https://github.com/itsvvill/stockUp/edit/main/README.md#authenticated-user-features)
    - [Stocks](https://github.com/itsvvill/stockUp/edit/main/README.md#stocks)
      - [Stock Search](https://github.com/itsvvill/stockUp/edit/main/README.md#stock-search)
      - [Stock Watchlist](https://github.com/itsvvill/stockUp/edit/main/README.md#stock-watchlist)
    - [Transactions](https://github.com/itsvvill/stockUp/edit/main/README.md#transactions)
- [Future Features](https://github.com/itsvvill/stockUp/edit/main/README.md#future-features)
- [License](https://github.com/itsvvill/stockUp/edit/main/README.md#license)
- [Disclaimer](https://github.com/itsvvill/stockUp/edit/main/README.md#disclaimer)

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

#### Stocks

---

![Stock component](./public/stockUp_stock_component.png)

##### Stock Search

- Lookup pricing information and other metrics using the stock symbol
- Add stocks to watchlist
- Get suggested ticker symbols if search query doesn't match a symbol

##### Stock Watchlist

- Add stocks to watchlist using form
- Give watchlist a custom name
- Update watchlist name
- Edit/Update stock watchlist items
- Delete stocks from watchlist
- Shows stock symbol and name
- Shows gain or loss on day based on background color
- Shows percentage gained or loss for each stock
- Shows current stock prices

#### Transactions

---

![Transaction list and transaction form](./public/stockUp_transaction_list.png)

- Create and view transactions with name, amount, date, category, and color
- Filter transactions to view only a specific category
- Sort transactions alphabetically, by transaction date, and by amount
- View largest, smallest, total, and average transaction amounts
- Edit/Update a transaction
- Delete transactions

## Future Features

- Additional metrics for transactions
- Ability to update and create new categories

## License

Stock prices and information are retrieved using the [Alpha Vantage API](https://www.alphavantage.co/) and the [Finnhubb API](https://finnhub.io/docs/api).

## Disclaimer

Any suggestions or features are not financial advice, invest at your own risk.
