// styles and icons
import styles from './Stocks.module.css';

export default function StockSearchBar({
  stockName,
  newStockSymbol,
  updateSearchQuery,
  toggleSubmit,
}) {
  const handleSubmit = (e) => {
    toggleSubmit(e);
  };
  return (
    <>
      {(stockName === '' || stockName === undefined) && (
        <span className={styles['title']}>Stock Prices</span>
      )}
      <div>
        <form
          id="stockForm"
          onSubmit={handleSubmit}
          className={styles['search']}
        >
          <input
            placeholder="Enter a stock ticker"
            type="text"
            name="stockName"
            className={styles['input']}
            onChange={(e) => updateSearchQuery(e.target.value.toUpperCase())}
            minLength="1"
            maxLength="10"
            autoComplete="off"
            required
          />
          <button type="submit" value="Search" className={styles['btn']}>
            Search
          </button>
        </form>
      </div>
      {stockName === undefined && (
        <p className={styles.error}>
          Sorry, no results found. Try another search.
        </p>
      )}
    </>
  );
}
