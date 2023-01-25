import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

// styles
import styles from './Stocks.module.css';

export default function StockWatchList() {
  const { addDocument, response } = useFirestore('stocks');
  const { user } = useAuthContext();
  //   const [searchQuery, setSearchQuery] = useState('');
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockName, setStockName] = useState('');
  const [stockExchange, setStockExchange] = useState('');

  //   let ALPHAVANTAGEAPI = process.env.REACT_APP_API_KEY;
  //   // api endpoints
  //   let companyOverviewURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchQuery}&apikey=${ALPHAVANTAGEAPI}`;

  //   // async fetch
  //   const fetchData = async (url) => {
  //     let response = await fetch(url);
  //     let data = await response.json();
  //     return data;
  //   };

  //general info api call
  //   const getGeneralInfo = (fetchCall, url) => {
  //     fetchCall(url).then((data) => {
  //       console.log(data);
  //       setStockSymbol(data.Symbol);
  //       setStockName(data.Name);
  //       setStockExchange(data.Exchange);
  //     });
  //   };

  //   function handleSubmit(e) {
  //     e.preventDefault();
  //     // getGeneralInfo(fetchData, companyOverviewURL);
  //     console.log(stockSymbol, stockName, stockExchange);
  //   }

  function addToWatchList(e) {
    e.preventDefault();
    console.log({ name: stockName, symbol: stockSymbol, uid: user.uid });
    // addDocument({ name: stockName, symbol: stockSymbol, uid: user.uid });
  }
  return (
    <div>
      {/* <form id="watchListSearch" onSubmit={handleSubmit}>
        <input
          placeholder="Enter a stock ticker"
          type="text"
          name="stockName"
          className={styles['input']}
          onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
          minLength="1"
          maxLength="6"
          autoComplete="off"
          required
        />
        <input type="submit" value="Search" className={styles['btn']} />
      </form> */}
      {stockName && (
        <form id="watchList" onSubmit={addToWatchList}>
          <input
            type="text"
            required
            placeholder={stockSymbol}
            value={stockSymbol}
            // className={styles['edit-name']}
            onChange={(e) => setStockSymbol(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder={stockName}
            value={stockName}
            // className={styles['edit-name']}
            onChange={(e) => setStockName(e.target.value)}
          />
          <button type="submit">Add To WatchList</button>
        </form>
      )}
    </div>
  );
}
