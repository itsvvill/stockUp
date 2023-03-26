import { useState } from 'react';
import API from '../../API';

import { motion } from 'framer-motion';
// styles and icons
import styles from './Stocks.module.css';

export default function StockSearchBar({
  searchQuery,
  stockName,
  toggleSubmit,
  updateSearchQuery,
}) {
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const getSearchResults = async () => {
    setSearchResults([]);
    setNotFound(false);
    try {
      await API.fetchSearch(searchQuery.toLowerCase()).then((data) => {
        let filteredData = data.bestMatches
          .filter((res) => !res['1. symbol'].includes('.'))
          .map((stock) => {
            return stock['1. symbol'];
          });
        if (filteredData?.length >= 1) {
          setSearchResults((prevState) => [...filteredData]);
        } else {
          setNotFound(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    const { dataset } = e.currentTarget;
    if (dataset.submit === 'button') {
      toggleSubmit(e);
    } else {
      toggleSubmit(e);
      getSearchResults();
    }
  };
  return (
    <>
      {(stockName === '' || stockName === undefined) && (
        <span className={styles['title']}>Stock Prices</span>
      )}
      <div className={styles['search-container']}>
        <form
          id="stockForm"
          data-submit="form"
          onSubmit={handleSubmit}
          className={styles['search']}
        >
          <div className={styles.searchbar}>
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
          </div>
          {stockName === undefined && notFound && (
            <p className={styles.error}>
              Sorry, no results found. Try another search.
            </p>
          )}
          {stockName === undefined && searchResults?.length >= 1 && (
            <div className={styles['search-results']}>
              <p className={styles.suggestions}>Related to your search:</p>
              {searchResults.map((res) => (
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  type="submit"
                  form="stockForm"
                  data-submit="button"
                  onClick={(e) => updateSearchQuery(e.target.value)}
                  className={styles['suggested-symbols']}
                  key={res}
                  value={res}
                >
                  {res}
                </motion.button>
              ))}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
