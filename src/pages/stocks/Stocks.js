import React, { useState } from 'react';

// styles
import styles from './Stocks.module.css';

export default function Stocks() {
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockName, setStockName] = useState('');
  const [stockExchange, setStockExchange] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const [changeAmount, setChangeAmount] = useState(0);
  const [openPrice, setOpenPrice] = useState(0);
  const [percentChange, setPercentChange] = useState(0);

  let api = process.env.REACT_APP_API_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    let apiURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${api}`;
    // let apiURL = `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${api}`;
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStockName(data.Name);
        setStockExchange(data.Exchange);
        // setCurrentPrice(data.c);
        // setHighPrice(data.h);
        // setLowPrice(data.l);
        // setChangeAmount(data.d);
        // // add to form
        // setOpenPrice(data.o);
        // setPercentChange(data.dp);
      });
  };

  return (
    <div className={styles['container']}>
      <div className={styles['info']}>
        {stockSymbol && (
          <h1 className={styles['stock']}>
            {stockSymbol}
            <span role="img" aria-label="money">
              💵
            </span>{' '}
            {stockName}{' '}
            <span role="img" aria-label="money">
              💵
            </span>
          </h1>
        )}
        {!stockSymbol && <h1 className={styles['stock']}>Stock Prices </h1>}
        {currentPrice !== 0 && (
          <>
            <div className={styles['prices']}>
              <p className={styles['high-price']}>High: ${highPrice}</p>
              <p className={styles['change-in-price']}>
                Change: ${changeAmount}
              </p>
              <p className={styles['low-price']}>Low: ${lowPrice}</p>
            </div>
            <>
              <p className={styles['current-price']}>
                Current price: ${currentPrice}
              </p>
              <p className={styles['percent-change']}>{percentChange}%</p>
            </>
          </>
        )}
      </div>
      <div className={styles['search']}>
        <form id="stockForm" onSubmit={handleSubmit}>
          <input
            placeholder="Enter a stock ticker"
            type="text"
            name="stockName"
            className={styles['input']}
            onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
            minLength="1"
            maxLength="6"
            autoComplete="off"
            required
          />
          <input type="submit" value="Submit" className={styles['btn']} />
        </form>
      </div>
    </div>
  );
}
