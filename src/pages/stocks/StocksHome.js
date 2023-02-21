import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

// pages and components
import SearchResults from './SearchResults';
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
  const [searchResults, setSearchResults] = useState([]);
  const [formSubmit, setFormSubmit] = useState(false);
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
      console.log(data);
      setHighPrice(data.h);
      setLowPrice(data.l);
      setCurrentPrice(data.c);
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

  // api request for general, pricing, and search information
  const handleSubmit = (e) => {
    e.preventDefault();
    getGeneralInfo(fetchData, companyOverviewURL);
    getPricingInfo(fetchData, quoteEndpointURL);
    // getSearchResults(fetchData, searchURL);
    // setSearchResults([]);
    setStockSymbol('');
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

  // toggles stock search bar if submitted
  const toggleSubmit = (e) => {
    e.preventDefault();
    setFormSubmit((prevState) => !prevState);
    if (formSubmit) {
      handleSubmit(e);
    }
  };
  return (
    <div>
      {!stockName && (
        <div className={styles['stocks-home-container']}>
          <div className={styles['container']}>
            <StockSearchBar
              stockName={stockName}
              newStockSymbol={newStockSymbol}
              updateSearchQuery={updateSearchQuery}
              toggleSubmit={toggleSubmit}
              toggleStockWatchListForm={toggleStockWatchListForm}
            />
            {/* <SearchResults
              searchResults={searchResults}
              // changeSearchQuery={changeSearchQuery}
              // changeSymbolClicked={changeSymbolClicked}
            /> */}
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
      )}
      {stockName && currentPrice !== 0 && (
        <div className={styles['stocks-home-container']}>
          <div className={styles['container']}>
            <Stocks
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
              toggleStockWatchListForm={toggleStockWatchListForm}
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
      )}
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
  );
}
