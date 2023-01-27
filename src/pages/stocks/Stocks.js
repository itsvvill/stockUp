import { UilPlusCircle } from '@iconscout/react-unicons';

// styles
import styles from './Stocks.module.css';

export default function Stocks({
  stockName,
  currentPrice,
  sector,
  highPrice,
  lowPrice,
  isLoss,
  changeAmount,
  percentChange,
  stockSymbol,
  stockExchange,
  toggleStockWatchList,
}) {
  const handleClick = () => {
    toggleStockWatchList((prevState) => !prevState);
  };

  return (
    <>
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
              {stockName}
              <button
                onClick={handleClick}
                className={styles['toggle-watchlist-btn']}
              >
                <UilPlusCircle size="22" />
                {/* Add to Watchlist */}
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
