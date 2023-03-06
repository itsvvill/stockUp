import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

// pages and components
// import SearchResults from './SearchResults';
import Stocks from './Stocks';
import StockSearchBar from './StockSearchBar';
import StockWatchList from './StockWatchList';
import StockWatchListForm from './StockWatchListForm';

// styles
import styles from './Stocks.module.css';

export default function StocksHome() {
  const [showStockWatchListForm, setShowStockWatchListForm] = useState(false);
  const [stockName, setStockName] = useState('');
  const [newStockSymbol, setNewStockSymbol] = useState(null);
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockExchange, setStockExchange] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sector, setSector] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
  const [logoURL, setLogoURL] = useState('');
  const [changeAmount, setChangeAmount] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const [isLoss, setIsLoss] = useState(false);
  const { user } = useAuthContext();
  const { documents } = useCollection(
    'stocks',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );
  // FINNHUBAPI KEY
  const FINNHUBAPI = process.env.REACT_APP_FINNHUB;

  // api URLs
  let companyOverviewURL = `https://finnhub.io/api/v1/stock/profile2?symbol=${searchQuery}&token=${FINNHUBAPI}`;
  let quoteEndpointURL = `https://finnhub.io/api/v1/quote?symbol=${searchQuery}&token=${FINNHUBAPI}`;

  // async fetch
  const fetchData = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  };

  //general info api call
  const getGeneralInfo = (fetchCall, url) => {
    fetchCall(url).then((data) => {
      setStockSymbol(data.ticker);
      setStockName(data.name);
      setStockExchange(
        data.exchange?.split(' ')[0] === 'NASDAQ'
          ? data.exchange?.split(' ')[0]
          : data.exchange?.split(' ')[0] === 'NEW'
          ? 'NYSE'
          : data.exchange
      );
      setSector(data.finnhubIndustry.toUpperCase());
      setLogoURL(data.logo);
    });
  };

  //pricing info api call
  const getPricingInfo = (fetchCall, url) => {
    fetchCall(url).then((data) => {
      setHighPrice(parseFloat(data.h).toFixed(2));
      setLowPrice(parseFloat(data.l).toFixed(2));
      setCurrentPrice(parseFloat(data.c).toFixed(2));
      setChangeAmount(parseFloat(data.d).toFixed(2));
      setPercentChange(
        ('' + data.dp)?.[0] === '-'
          ? ('' + data.dp)?.slice(0, 5)
          : ('' + data.dp)?.slice(0, 4)
      );
      if (data.dp < 0) {
        setIsLoss(true);
      } else {
        setIsLoss(false);
      }
    });
  };

  // sets new stock symbol on click
  const toggleNewStockSymbol = (symbol) => {
    setNewStockSymbol((prevState) => symbol);
  };

  // toggles stock watchlist form visibility on click
  const toggleStockWatchListForm = () => {
    setShowStockWatchListForm((prevState) => !prevState);
  };

  // updates search to a new query
  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  // api request for general, pricing, and search information
  const toggleSubmit = (e) => {
    e.preventDefault();
    getGeneralInfo(fetchData, companyOverviewURL);
    getPricingInfo(fetchData, quoteEndpointURL);
    setStockSymbol('');
  };
  return (
    <div className={styles['stocks-home-container']}>
      {!stockName && (
        <div className={styles['stocks-components-container']}>
          <div className={styles.flex}>
            <div className={styles['container']}>
              <StockSearchBar
                stockName={stockName}
                newStockSymbol={newStockSymbol}
                updateSearchQuery={updateSearchQuery}
                toggleSubmit={toggleSubmit}
                toggleStockWatchListForm={toggleStockWatchListForm}
              />
            </div>
            {documents !== null && documents.length >= 1 && (
              <StockWatchList
                stocks={documents}
                user={user}
                toggleStockWatchListForm={toggleStockWatchListForm}
                toggleNewStockSymbol={toggleNewStockSymbol}
                fetchData={fetchData}
              />
            )}
          </div>
          {showStockWatchListForm && (
            <StockWatchListForm
              uid={user.uid}
              stocks={documents}
              stockSymbol={stockSymbol}
              stockName={stockName}
              stockExchange={stockExchange}
              toggleStockWatchListForm={toggleStockWatchListForm}
            />
          )}
        </div>
      )}
      {stockName && currentPrice !== 0 && (
        <div className={styles['stocks-components-container']}>
          <div className={styles.flex}>
            <div className={styles['container']}>
              <Stocks
                stocks={documents}
                stockName={stockName}
                currentPrice={currentPrice}
                sector={sector}
                highPrice={highPrice}
                lowPrice={lowPrice}
                isLoss={isLoss}
                changeAmount={changeAmount}
                percentChange={percentChange}
                logoURL={logoURL}
                stockSymbol={stockSymbol}
                stockExchange={stockExchange}
                uid={user.uid}
              />
              <StockSearchBar
                stockName={stockName}
                newStockSymbol={newStockSymbol}
                updateSearchQuery={updateSearchQuery}
                toggleSubmit={toggleSubmit}
              />
            </div>
            {documents !== null && documents.length >= 1 && (
              <StockWatchList
                stocks={documents}
                user={user}
                toggleStockWatchListForm={toggleStockWatchListForm}
                toggleNewStockSymbol={toggleNewStockSymbol}
                fetchData={fetchData}
              />
            )}
          </div>
          {showStockWatchListForm && (
            <StockWatchListForm
              uid={user.uid}
              stocks={documents}
              stockSymbol={stockSymbol}
              stockName={stockName}
              stockExchange={stockExchange}
              toggleStockWatchListForm={toggleStockWatchListForm}
            />
          )}
        </div>
      )}
    </div>
  );
}
