import React, { useState } from 'react';

// styles
import styles from './Stocks.module.css';

export default function Stocks() {
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockName, setStockName] = useState('');
  const [stockExchange, setStockExchange] = useState('');
  const [sector, setSector] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const [changeAmount, setChangeAmount] = useState(0);
  const [openPrice, setOpenPrice] = useState(0);
  const [day, setDay] = useState('');
  const [tradeVolume, setTradeVolume] = useState(0);
  const [percentChange, setPercentChange] = useState(0);

  let api = process.env.REACT_APP_API_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    const companyOverviewURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${api}`;
    const quoteEndpointURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${api}`;
    fetch(companyOverviewURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStockName(data.Name);
        setStockExchange(data.Exchange);
        setSector(data.Sector);
      });
    fetch(quoteEndpointURL)
      .then((res) => res.json())
      .then((data) => {
        data = data['Global Quote'];
        setOpenPrice('02. open');
        setHighPrice(data['03. high']);
        setLowPrice(data['04. low']);
        setCurrentPrice(data['05. price']);
        setTradeVolume(data['06 volume']);
        setDay(data['07. latest trading day']);
        setChangeAmount(data['09. change']);
        setPercentChange(data['10. change percent']);
      });
  };

  return (
    <div className={styles['container']}>
      {!stockName && (
        <>
          <h1 className={styles['title']}>Stock Prices </h1>
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
              <input type="submit" value="Search" className={styles['btn']} />
            </form>
          </div>
        </>
      )}
      {stockName && currentPrice !== 0 && (
        <>
          <div role="heading" className={styles['heading']}>
            <span className={styles['symbol']}>{stockSymbol}</span>
            {'>'}
            <span className={styles['exchange']}>{stockExchange}</span>
            {'>'}
            <span className={styles['sector']}>{sector}</span>
          </div>

          <div className={styles['title-and-prices']}>
            <span className={styles['stock']}>{stockName}</span>
            <div className={styles['prices']}>
              <p className={styles['high-price']}>
                High: ${parseFloat(highPrice).toFixed(2)}
              </p>
              <p className={styles['change-in-price']}>
                Change: ${parseFloat(changeAmount).toFixed(2)}
              </p>
              <p className={styles['low-price']}>
                Low: ${parseFloat(lowPrice).toFixed(2)}
              </p>
              <div />
            </div>
            <>
              <p className={styles['current-price']}>
                Current price: ${parseFloat(currentPrice).toFixed(2)}
              </p>
              <p className={styles['percent-change']}>{percentChange}</p>
            </>
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
                <input type="submit" value="Search" className={styles['btn']} />
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
