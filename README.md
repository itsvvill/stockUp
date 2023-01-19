# StockUp

StockUp is a finance and stock tracker created to help the user make smarter financial decisions.

## Technologies and Languages

- ReactJS
- React-router
- JavaScript
- Google Firebase
- CSS
- HTML5

## Image

[Transaction list and transaction form](./public/stockUp_transaction_list.png)

## Usage

### Signup/Login

Users have 3 options for signing up:

- manually enter email, password, display name
- using their Google account
- using their Facebook account

### Authenticated User Features

- Create and view transactions with name, amount, date, category, and color
- Filter transactions to view only a specific category
- Delete transactions
- Lookup pricing information and other metrics using the stock symbol
- If search query doesn't match a stock symbol a general search is performed and best results are shown to user as clickable buttons.

## Features to be implemented

- Updating a transaction after creation
- Additional metrics for transactions (total number per category, total amount, amount per month)
- Sorting transactions by date, amount, name
- Storing a list of stocks selected by user
- Conditionally showing user stock details if the stock is up

## License

Stock prices and information are retrieved using the [Alpha Vantage API](https://www.alphavantage.co/).

## Disclaimer

Any suggestions or features are not financial advice, invest at your own risk.
