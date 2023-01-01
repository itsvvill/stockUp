import React, { useState, useEffect } from 'react';

// styles
import styles from './Stocks.module.css';

export default function Stocks() {
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState(0);
  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);
  const [change, setChange] = useState(0);
  const [perc, setPerc] = useState(0);

  let api = process.env.REACT_APP_API_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    let apiURL = `https://finnhub.io/api/v1/quote?symbol=${stock}&token=${api}`;
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        setPrice(data.c);
        setHigh(data.h);
        setLow(data.l);
        setChange(data.d);
        setPerc(data.dp);
      });
  };
  return (
    <div className={styles['container']}>
      <div className={styles['info']}>
        {stock && (
          <h1 className={styles['stock']}>
            <span role="img" aria-label="money">
              💵
            </span>{' '}
            {stock}{' '}
            <span role="img" aria-label="money">
              💵
            </span>
          </h1>
        )}
        {!stock && (
          <h1 className={styles['stock']}>
            <span role="img" aria-label="to the moon">
              🚀
            </span>{' '}
            Stock Prices{' '}
            <span role="img" aria-label="to the moon">
              🚀
            </span>
          </h1>
        )}
        <div className={styles['prices']}>
          <p className={styles['high-price']}>High: ${high}</p>
          <p className={styles['change-in-price']}>Change: ${change}</p>
          <p className={styles['low-price']}>Low: ${low}</p>
        </div>
        <p className={styles['current-price']}>Current price: ${price}</p>
        <p className={styles['perc-change']}>{perc}%</p>
      </div>
      <div className={styles['search']}>
        <form id="stockForm" onSubmit={handleSubmit}>
          <input
            placeholder="Enter a stock "
            type="text"
            name="stockName"
            className={styles['input']}
            onChange={(e) => setStock(e.target.value.toUpperCase())}
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
