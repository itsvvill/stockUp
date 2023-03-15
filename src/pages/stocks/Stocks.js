import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { motion } from 'framer-motion';

// styles and icons
import styles from './Stocks.module.css';
import { UilPlusCircle, UilCheckCircle } from '@iconscout/react-unicons';

export default function Stocks({
  stocks,
  stockName,
  currentPrice,
  sector,
  highPrice,
  lowPrice,
  isLoss,
  changeAmount,
  percentChange,
  stockSymbol,
  logoURL,
  stockExchange,
  uid,
}) {
  const { addDocument } = useFirestore('stocks');
  const [inWatchList, setInWatchList] = useState(false);

  //checks if stock already exists in watchlist
  useEffect(() => {
    setInWatchList(false);
    let duplicateCheck = stocks.filter(
      (stock) => stock.stockSymbol === stockSymbol
    );
    if (duplicateCheck.length >= 1) {
      setInWatchList(true);
    }
  }, [stockSymbol, stocks]);

  // adds a stock to the watchlist
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inWatchList) {
      const newDocument = {
        watchList: stocks?.[stocks.length - 1]?.watchList
          ? stocks[stocks.length - 1].watchList
          : 'Stock Watchlist',
        stockName: stockName,
        stockSymbol: stockSymbol,
        stockLogo: logoURL,
        uid: uid,
      };
      addDocument(newDocument);
    }
  };

  return (
    <>
      {/* only displays if stock info exists */}
      {stockName && currentPrice !== 0 && (
        <>
          <div role="heading" aria-level="2" className={styles['heading']}>
            <span className={styles['symbol']}>{stockSymbol}</span>
            {'>'}
            <span className={styles['exchange']}>{stockExchange}</span>
            {'>'}
            <span className={styles['sector']}>{sector}</span>
          </div>

          <div className={styles['title-and-prices']}>
            <span className={styles['stock']}>
              <img
                className={styles.logo}
                src={logoURL}
                alt={`${stockName} logo`}
              />
              {stockName}
              {inWatchList && (
                <button
                  onClick={(e) => handleSubmit(e)}
                  className={styles['toggle-watchlist-btn-added']}
                >
                  <UilCheckCircle size="22" />
                </button>
              )}
              {!inWatchList && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                  onClick={(e) => handleSubmit(e)}
                  className={styles['toggle-watchlist-btn']}
                >
                  <UilPlusCircle size="22" />
                </motion.button>
              )}
            </span>
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
          </div>
        </>
      )}
    </>
  );
}
