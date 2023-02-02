// styles
import styles from './Stocks.module.css';

export default function StockSearchBar({
  stockName,
  newStockSymbol,
  updateSearchQuery,
  toggleSubmit,
}) {
  const handleSubmit = (e) => {
    // e.preventDefault();
    toggleSubmit(e);
  };
  return (
    <>
      {stockName === '' && <h1 className={styles['title']}>Stock Prices </h1>}
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
