import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

// styles
import styles from './Stocks.module.css';

export default function StockWatchList({
  uid,
  stocks,
  stockSymbol,
  stockName,
  stockExchange,
  toggleStockWatchListForm,
}) {
  const { addDocument, response } = useFirestore('stocks');
  const [newStockWatchList, setNewStockWatchList] = useState('');
  const [newStockSymbol, setNewStockSymbol] = useState('');
  const [newStockName, setNewStockName] = useState('');
  const [newStockExchange, setNewStockExchange] = useState('');

  // either starts a new stock watchlist, or adds a new stock to watchlist
  const handleSubmit = (e) => {
    e.preventDefault();
    const newDocument = {
      watchList: stocks?.[stocks.length - 1]?.watchList
        ? stocks[stocks.length - 1].watchList
        : newStockWatchList === ''
        ? 'Stock Watchlist'
        : newStockWatchList,
      stockName: newStockName,
      stockSymbol: newStockSymbol,
      stockExchange: newStockExchange,
      uid: uid,
    };
    addDocument(newDocument);
  };

  // waits for response and hides stock watchlist form
  useEffect(() => {
    if (response.success) {
      toggleStockWatchListForm((prevState) => !prevState);
    }
  }, [response.success, toggleStockWatchListForm]);

  return (
    <div className={styles['watchlist-form-container']}>
      {/* watchlist already exists */}
      {stockName && (
        <form className={styles['watchlist-form']} onSubmit={handleSubmit}>
          {stocks.length < 1 && (
            <input
              type="text"
              placeholder="Watchlist Name"
              value={newStockWatchList}
              className={styles['watchlist-form-input']}
              onChange={(e) => setNewStockWatchList(e.target.value)}
            />
          )}
          <input
            type="text"
            required
            placeholder={stockSymbol}
            value={newStockSymbol}
            className={styles['watchlist-form-input']}
            onChange={(e) => setNewStockSymbol(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder={stockName}
            value={newStockName}
            className={styles['watchlist-form-input']}
            onChange={(e) => setNewStockName(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder={stockExchange}
            value={newStockExchange}
            className={styles['watchlist-form-input']}
            onChange={(e) => setNewStockExchange(e.target.value)}
          />
          <button className={styles['watchlist-form-btn']}>
            Add To WatchList
          </button>
        </form>
      )}
      {/* watchlist not yet created */}
      {!stockName && (
        <form className={styles['watchlist-form']} onSubmit={handleSubmit}>
          {stocks.length < 1 && (
            <input
              type="text"
              placeholder="Watchlist Name"
              value={newStockWatchList}
              className={styles['watchlist-form-input']}
              onChange={(e) => setNewStockWatchList(e.target.value)}
            />
          )}
          <input
            type="text"
            required
            placeholder="Stock Symbol"
            value={newStockSymbol}
            className={styles['watchlist-form-input']}
            onChange={(e) => setNewStockSymbol(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Stock Name"
            value={newStockName}
            className={styles['watchlist-form-input']}
            onChange={(e) => setNewStockName(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Stock Exchange"
            value={newStockExchange}
            className={styles['watchlist-form-input']}
            onChange={(e) => setNewStockExchange(e.target.value)}
          />
          <button className={styles['watchlist-form-btn']}>
            Add To WatchList
          </button>
        </form>
      )}
    </div>
  );
}
