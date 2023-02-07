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
  const [showStockWatchList, setShowStockWatchList] = useState(false);
  const [stockName, setStockName] = useState('');
  const [newStockSymbol, setNewStockSymbol] = useState(null);
  const [stockSymbol, setStockSymbol] = useState('');
  const [stockExchange, setStockExchange] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sector, setSector] = useState('');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const [lowPrice, setLowPrice] = useState(0);
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

  let ALPHAVANTAGEAPI = process.env.REACT_APP_API_KEY;

  // api endpoints
  let searchURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchQuery}&apikey=${ALPHAVANTAGEAPI}`;
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
      setHighPrice(parseFloat(data['03. high']).toFixed(2));
      setLowPrice(parseFloat(data['04. low']).toFixed(2));
      setCurrentPrice(parseFloat(data['05. price']).toFixed(2));
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

  const toggleNewStockSymbol = (symbol) => {
    setNewStockSymbol((prevState) => symbol);
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
        <div className={styles['stocks-home-container']}>
          <div className={styles['container']}>
            <StockSearchBar
              stockName={stockName}
              newStockSymbol={newStockSymbol}
              updateSearchQuery={updateSearchQuery}
              toggleSubmit={toggleSubmit}
              toggleStockWatchList={toggleStockWatchList}
            />
            <SearchResults
              searchResults={searchResults}
              // changeSearchQuery={changeSearchQuery}
              // changeSymbolClicked={changeSymbolClicked}
            />
          </div>
          {documents !== null && documents.length >= 1 && (
            <StockWatchList
              stocks={documents}
              user={user}
              toggleStockWatchList={toggleStockWatchList}
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
              stockSymbol={stockSymbol}
              stockExchange={stockExchange}
              toggleStockWatchList={toggleStockWatchList}
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
              toggleStockWatchList={toggleStockWatchList}
              toggleNewStockSymbol={toggleNewStockSymbol}
              fetchData={fetchData}
            />
          )}
        </div>
      )}
      {showStockWatchList && (
        <StockWatchListForm
          uid={user.uid}
          stockSymbol={stockSymbol}
          stockName={stockName}
          stockExchange={stockExchange}
          toggleStockWatchList={toggleStockWatchList}
        />
      )}
    </div>
  );
}
