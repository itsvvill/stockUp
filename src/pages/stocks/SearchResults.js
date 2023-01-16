// styles
import styles from './Stocks.module.css';

export default function SearchResults({ searchResults, changeSearchQuery }) {
  function handleClick(e, query) {
    e.preventDefault();
    changeSearchQuery(query);
  }

  return (
    <div className={styles['search-results']}>
      {searchResults.length > 0 &&
        searchResults.map((res, index) => (
          <button
            key={res[0]}
            value={res[0]}
            onClick={(e) => handleClick(e, res[0])}
          >
            {res[0]}
          </button>
        ))}
    </div>
  );
}
