// styles and icons
import styles from './Stocks.module.css';
import { UilPlusCircle } from '@iconscout/react-unicons';

export default function StockSearchBar({
  stockName,
  newStockSymbol,
  updateSearchQuery,
  toggleSubmit,
  toggleStockWatchListForm,
}) {
  const handleSubmit = (e) => {
    // e.preventDefault();
    toggleSubmit(e);
  };
  // toggles stock watchlist form visibility on click
  const handleClick = () => {
    toggleStockWatchListForm((prevState) => !prevState);
  };
  return (
    <>
      {stockName === '' && (
        <span className={styles['title']}>
          Stock Prices{' '}
          <button
            onClick={handleClick}
            className={styles['toggle-watchlist-btn']}
          >
            <UilPlusCircle size="22" />
          </button>
        </span>
      )}
      <div className={styles['search']}>
        <form id="stockForm" onSubmit={handleSubmit}>
          <input
            placeholder="Enter a stock ticker"
            type="text"
            name="stockName"
            className={styles['input']}
            // value={newStockSymbol ? newStockSymbol : undefined}
            onChange={(e) => updateSearchQuery(e.target.value.toUpperCase())}
            minLength="1"
            maxLength="10"
            autoComplete="off"
            required
          />
          <input type="submit" value="Search" className={styles['btn']} />
        </form>
      </div>
    </>
  );
}
