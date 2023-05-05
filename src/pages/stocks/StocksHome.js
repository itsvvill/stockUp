import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import API from '../../API';

// pages and components
import Stocks from './Stocks';
import StockSearchBar from './StockSearchBar';
import StockWatchList from './StockWatchList';

// styles and icons
import styles from './Stocks.module.css';
import { UilExclamationCircle } from '@iconscout/react-unicons';
import StockWatchListForm from './StockWatchListForm';
import ViewToggle from '../../components/ViewToggle';

export default function StocksHome() {
  const [toggleView, setToggleView] = useState(false);
  const [stockName, setStockName] = useState('');
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
  const [searchError, setSearchError] = useState(false);
  const { user } = useAuthContext();
  const { documents } = useCollection(
    'stocks',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );

  //general info api call
  const getGeneralInfo = async () => {
    try {
      await API.fetchProfile(searchQuery).then((data) => {
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
    } catch (error) {
      setSearchError(true);
    }
  };

  //pricing info api call
  const getPricingInfo = async () => {
    try {
      await API.fetchQuote(searchQuery).then((data) => {
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
    } catch (error) {
      setSearchError(true);
    }
  };

  // updates search to a new query
  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };
  // allows ViewToggle to change state in parent
  const changeView = () => {
    setToggleView((prevState) => !prevState);
  };

  // api request for general, pricing, and search information
  const toggleSubmit = (e) => {
    e.preventDefault();
    getGeneralInfo();
    getPricingInfo();
    setStockSymbol('');
  };
  return (
    <div className={styles['stocks-home-container']}>
      <ViewToggle
        page={'stocks'}
        changeView={changeView}
        toggleView={toggleView}
      />
      {!toggleView && (
        <div className={styles['stocks-components-container']}>
          <div className={styles['container']}>
            {stockName && currentPrice !== 0 && (
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
            )}
            <StockSearchBar
              searchQuery={searchQuery}
              stockName={stockName}
              toggleSubmit={toggleSubmit}
              updateSearchQuery={updateSearchQuery}
            />
          </div>
        </div>
      )}
      {/* no watchlist created */}
      {toggleView && documents.length < 1 && (
        <div className={styles.flex}>
          <div className={styles['no-watchlist']}>
            <h1>
              <UilExclamationCircle
                className={styles.oops}
                size="25"
                color="red"
              />
              Your watchlist is empty
              <UilExclamationCircle
                className={styles.oops}
                size="25"
                color="red"
              />
            </h1>
            <p>To start a new list, fill out the form below.</p>
            <StockWatchListForm stocks={documents} uid={user.uid} />
          </div>
        </div>
      )}
      {/* if stocks exist in the watchlist */}
      {toggleView && documents !== null && documents.length >= 1 && (
        <div className={styles['stocks-components-container']}>
          {documents !== null && documents.length >= 1 && (
            <StockWatchList stocks={documents} user={user} />
          )}
        </div>
      )}
    </div>
  );
}
