import { useState } from 'react';
// pages and components
import Stocks from './Stocks';
import StockWatchList from './StockWatchList';
import SearchResults from './SearchResults';
// styles
import styles from './Stocks.module.css';
import StockSearchBar from './StockSearchBar';

export default function StocksHome() {
  const [showStockWatchList, setShowStockWatchList] = useState(false);
  const [stockName, setStockName] = useState('');
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockExchange, setStockExchange] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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
  const [formSubmit, setFormSubmit] = useState(false);

  // let FINNHUBAPI = process.env.REACT_APP_API_KEY;
  let ALPHAVANTAGEAPI = process.env.REACT_APP_API_KEY;

  // api endpoints
  let searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${ALPHAVANTAGEAPI}`;
  // let searchURL = `https://finnhub.io/api/v1/search?q=${searchQuery}&token=${FINNHUBAPI}`;
  let companyOverviewURL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${searchQuery}&apikey=${ALPHAVANTAGEAPI}`;
  let quoteEndpointURL = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${searchQuery}&apikey=${ALPHAVANTAGEAPI}`;

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
    getSearchResults(fetchData, searchURL);
    setSearchResults([]);
    setStockSymbol('');
  };

  const toggleStockWatchList = () => {
    setShowStockWatchList((prevState) => !prevState);
  };

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

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
        <div className={styles['container']}>
          <StockSearchBar
            stockName={stockName}
            updateSearchQuery={updateSearchQuery}
            toggleSubmit={toggleSubmit}
          />
          <SearchResults
            searchResults={searchResults}
            // changeSearchQuery={changeSearchQuery}
            // changeSymbolClicked={changeSymbolClicked}
          />
        </div>
      )}
      {stockName && currentPrice !== 0 && (
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
            stockSymbol={stockSymbol}
            stockExchange={stockExchange}
            toggleStockWatchList={toggleStockWatchList}
          />
          <StockSearchBar
            updateSearchQuery={updateSearchQuery}
            toggleSubmit={toggleSubmit}
          />
        </div>
      )}
      {showStockWatchList && (
        <StockWatchList
          stockSymbol={stockSymbol}
          stockName={stockName}
          stockExchange={stockExchange}
        />
      )}
    </div>
  );
}
