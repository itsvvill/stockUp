import { useFirestore } from '../../hooks/useFirestore';

// styles and icons
import styles from './Stocks.module.css';
import { UilPlusCircle } from '@iconscout/react-unicons';

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
  const { addDocument, response } = useFirestore('stocks');

  // adds a stock to the watchlist
  const handleSubmit = (e) => {
    e.preventDefault();
    const newDocument = {
      watchList: stocks?.[stocks.length - 1]?.watchList
        ? stocks[stocks.length - 1].watchList
        : 'Stock Watchlist',
      stockName: stockName,
      stockSymbol: stockSymbol,
      stockExchange: stockExchange,
      uid: uid,
    };
    addDocument(newDocument);
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
              <button
                onClick={(e) => handleSubmit(e)}
                className={styles['toggle-watchlist-btn']}
              >
                <UilPlusCircle size="22" />
              </button>
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
