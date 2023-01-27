// styles
import styles from './Stocks.module.css';

export default function StockWatchList({ stocks }) {
  return (
    <div className={styles['stock-watchlist-container']}>
      <h1 className={styles['stocks-watchlist-heading']}>Stock WatchList</h1>
      {stocks &&
        stocks.map((stock) => (
          <li className={styles['stocks-watchlist-item']}>
            <p className={styles['stocks-watchlist-symbol']}>
              {stock.stockSymbol}
            </p>
            <p className={styles['stocks-watchlist-name']}>{stock.stockName}</p>
          </li>
        ))}
    </div>
  );
}
