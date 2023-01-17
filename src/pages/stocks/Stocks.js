import React, { useEffect, useState } from 'react';
import SearchResults from './SearchResults';

// styles
import styles from './Stocks.module.css';

export default function Stocks() {
  const [searchQuery, setSearchQuery] = useState('');
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
  const [isLoss, setIsLoss] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [symbolClicked, setSymbolClicked] = useState(false);

  // let FINNHUBAPI = process.env.REACT_APP_API_KEY;
  let ALPHAVANTAGEAPI = process.env.REACT_APP_API_KEY;

  // api endpoints
  let searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${ALPHAVANTAGEAPI}`;
  // let searchURL = `https://finnhub.io/api/v1/search?q=${searchQuery}&token=${FINNHUBAPI}`;
  let companyOverviewURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchQuery}&apikey=${ALPHAVANTAGEAPI}`;
  let quoteEndpointURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${searchQuery}&apikey=${ALPHAVANTAGEAPI}`;

  const changeSearchQuery = (newSearch) => {
    setSearchQuery(newSearch);
  };
  const changeSymbolClicked = (bool) => {
    setSymbolClicked(bool);
  };
  // async fetch
  const fetchData = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  };
  //general info api call
  const getGeneralInfo = (fetchCall, url) => {
    fetchCall(url).then((data) => {
      setStockSymbol(data.Symbol);
      setStockName(data.Name);
      setStockExchange(data.Exchange);
      setSector(data.Sector);
    });
  };

  //pricing info api call
  const getPricingInfo = (fetchCall, url) => {
    fetchCall(url).then((data) => {
      data = data['Global Quote'];
      setOpenPrice(parseFloat(data['02. open']).toFixed(2));
      setHighPrice(parseFloat(data['03. high']).toFixed(2));
      setLowPrice(parseFloat(data['04. low']).toFixed(2));
      setCurrentPrice(parseFloat(data['05. price']).toFixed(2));
      setTradeVolume(data['06 volume']);
      setDay(data['07. latest trading day']);
      setChangeAmount(parseFloat(data['09. change']));
      setPercentChange(
        data['10. change percent']?.[0] === '-'
          ? data['10. change percent'].slice(0, 5)
          : data['10. change percent'].slice(0, 4)
      );
      if (data['10. change percent']?.[0] === '-') {
        setIsLoss(true);
      } else {
        setIsLoss(false);
      }
    });
  };
  //search info api call
  const getSearchResults = (fetchCall, url) => {
    fetchCall(url).then((data) => {
      setSearchResults(
        data.bestMatches
          .filter((item, count = 0) => {
            if (count < 3 && !item['1. symbol'].split('').includes('.')) {
              count++;
              return true;
            } else {
              return false;
            }
          })
          .map((arr) => [arr['1. symbol'], arr['2. name']])
      );
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getGeneralInfo(fetchData, companyOverviewURL);
    getPricingInfo(fetchData, quoteEndpointURL);

    // need to consider better way to control number of api calls
    setTimeout(() => {
      if (stockName === '' && currentPrice === 0) {
        console.log(stockName, currentPrice);
        getSearchResults(fetchData, searchURL);
      }
    }, 200);
    // setSearchResults([]);
    setStockSymbol('');
  };

  // useEffect(() => {
  //   if (searchQuery !== '') {
  //     getPricingInfo(fetchData, quoteEndpointURL);
  //     getGeneralInfo(fetchData, companyOverviewURL);
  //     console.log(symbolClicked);
  //     // setSearchResults([]);
  //     // setStockSymbol('');
  //     // setSearchQuery('');
  //   }
  // }, [symbolClicked]);

  return (
    <>
      {!stockName && (
        <div className={styles['container']}>
          <h1 className={styles['title']}>Stock Prices </h1>
          <div className={styles['search']}>
            <form id="stockForm" onSubmit={handleSubmit}>
              <input
                placeholder="Enter a stock ticker"
                type="text"
                name="stockName"
                className={styles['input']}
                onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                minLength="1"
                maxLength="10"
                autoComplete="off"
                required
              />
              <input type="submit" value="Search" className={styles['btn']} />
            </form>
          </div>
          <SearchResults
            searchResults={searchResults}
            changeSearchQuery={changeSearchQuery}
            changeSymbolClicked={changeSymbolClicked}
          />
        </div>
      )}
      {stockName && currentPrice !== 0 && (
        <div className={styles['container']}>
          <div role="heading" aria-level="2" className={styles['heading']}>
            <span className={styles['symbol']}>{stockSymbol}</span>
            {'>'}
            <span className={styles['exchange']}>{stockExchange}</span>
            {'>'}
            <span className={styles['sector']}>{sector}</span>
          </div>

          <div className={styles['title-and-prices']}>
            <span className={styles['stock']}>{stockName}</span>
            <div className={styles['prices']}>
              <p className={styles['high-price']}>High: ${highPrice}</p>
              <p
                className={
                  isLoss
                    ? styles['change-in-price-loss']
                    : styles['change-in-price-gain']
                }
              >
                Change: {changeAmount > 0 ? '+' + changeAmount : changeAmount}
              </p>
              <p className={styles['low-price']}>Low: ${lowPrice}</p>
              <div />
            </div>
            <div
              className={
                isLoss ? styles['percent-is-loss'] : styles['percent-is-gain']
              }
            >
              <p className={styles['current-price']}>${currentPrice}</p>
              <p className={styles['percent-change']}>
                {isLoss ? (
                  <span className={styles['arrow-loss']}>⬇</span>
                ) : (
                  <span className={styles['arrow-gain']}>⬆</span>
                )}
                {percentChange}%
              </p>
            </div>
            <div className={styles['search']}>
              <form id="stockForm" onSubmit={handleSubmit}>
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
              </form>
            </div>
            <SearchResults
              searchResults={searchResults}
              changeSearchQuery={changeSearchQuery}
              changeSymbolClicked={changeSymbolClicked}
            />
          </div>
        </div>
      )}
    </>
  );
}
