// styles
import styles from './Stocks.module.css';

export default function StockWatchList({ stocks }) {
  return (
    <div className={styles['stock-watchlist-container']}>
      <h1 className={styles['stocks-watchlist-heading']}>Stock WatchList</h1>
      {stocks &&
        stocks.map((stock) => (
          <li className={styles['stocks-watchlist-item']}>
            <button
              // onClick={() => console.log(stock.stockSymbol)}
              className={styles['stocks-watchlist-symbol']}
            >
              {stock.stockSymbol}
            </button>
            <p className={styles['stocks-watchlist-name']}>{stock.stockName}</p>
          </li>
        ))}
    </div>
  );
}
