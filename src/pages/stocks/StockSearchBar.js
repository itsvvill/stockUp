import { motion } from 'framer-motion';
// styles and icons
import styles from './Stocks.module.css';

export default function StockSearchBar({
  stockName,
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
          <motion.button
            whileHover={{ scale: 1.1 }}
            type="submit"
            value="Search"
            className={styles['btn']}
          >
            Search
          </motion.button>
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
