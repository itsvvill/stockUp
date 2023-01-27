// styles
import styles from './Stocks.module.css';

export default function StockWatchList({ stocks }) {
  return (
    <div className={styles['stock-watchlist-container']}>
      <h1 className={styles['stocks-watchlist-heading']}>Stock WatchList</h1>
      {stocks &&
        stocks.map((stock) => (
          <li>
            <p>{stock.stockName}</p>
            <p>{stock.stockSymbol}</p>
          </li>
        ))}
    </div>
  );
}
