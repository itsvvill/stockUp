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
  // https://finnhub.io/api/v1/quote?symbol=AAPL&token=APIHERE
  useEffect(() => {});

  const getData = () => {
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
    <div className="container">
      <div className="info">
        {stock && (
          <h1 className="stock">
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
          <h1 className="stock">
            <span role="img" aria-label="to the moon">
              🚀
            </span>{' '}
            Stock Prices{' '}
            <span role="img" aria-label="to the moon">
              🚀
            </span>
          </h1>
        )}
        <div className="prices">
          <p className="high-price">High: ${high}</p>
          <p className="change-in-price">Change: ${change}</p>
          <p className="low-price">Low: ${low}</p>
        </div>
        <p className="current-price">Current price: ${price}</p>
        <p className="perc-change">{perc}%</p>
      </div>
      <div className="search">
        <input
          placeholder="Enter a stock "
          type="text"
          className="input"
          onChange={(e) => setStock(e.target.value.toUpperCase())}
          minLength="1"
          maxLength="6"
          required
        />
        <button className="btn" onClick={getData}>
          Get Price Info
        </button>
      </div>
    </div>
  );
}
