import { useState } from 'react';
import API from '../../API';

import { motion } from 'framer-motion';
// styles and icons
import styles from './Stocks.module.css';

export default function StockSearchBar({
  searchQuery,
  stockName,
  updateSearchQuery,
  toggleSubmit,
}) {
  const [searchResults, setSearchResults] = useState([]);

  const getSearchResults = async () => {
    try {
      await API.fetchSearch(searchQuery).then((data) => {
        let filteredData = data.bestMatches
          .filter((res) => !res['1. symbol'].includes('.'))
          .map((stock) => {
            return stock['1. symbol'];
          });
        if (filteredData?.length >= 1) {
          setSearchResults((prevState) => [...filteredData]);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    toggleSubmit(e);
    getSearchResults();
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
            whileTap={{ scale: 1 }}
            type="submit"
            value="Search"
            className={styles['btn']}
          >
            Search
          </motion.button>
        </form>
      </div>
      {stockName === undefined && searchResults === undefined && (
        <p className={styles.error}>
          Sorry, no results found. Try another search.
        </p>
      )}
      {stockName === undefined && searchResults?.length >= 1 && (
        <div className={styles['search-results']}>
          {searchResults.map((res, index) => (
            <button
              key={res}
              value={res}
              // onClick={(e) => handleClick(e, res[0])}
            >
              {res}
            </button>
          ))}
        </div>
        // <p className={styles.error}>
        //   Related to your search:{' '}
        //   <button>{searchResults[0]['1. symbol']}</button>
        // </p>
      )}
    </>
  );
}
