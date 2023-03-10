import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

// styles
import styles from './Stocks.module.css';

export default function StockWatchListForm({
  uid,
  stocks,
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
        : newStockWatchList.trim(),
      stockName: newStockName.trim(),
      stockSymbol: newStockSymbol.trim().toUpperCase(),
      stockExchange: newStockExchange.trim(),
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
      {stocks?.[stocks.length - 1]?.watchList && (
        <form className={styles['watchlist-form']} onSubmit={handleSubmit}>
          {stocks.length < 1 && (
            <input
              type="text"
              placeholder="Watchlist"
              value={newStockWatchList}
              className={styles['watchlist-form-input']}
              onChange={(e) => setNewStockWatchList(e.target.value)}
            />
          )}
          <input
            type="text"
            required
            placeholder="Symbol"
            value={newStockSymbol}
            className={styles['watchlist-form-input']}
            onChange={(e) => setNewStockSymbol(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Name"
            value={newStockName}
            className={styles['watchlist-form-input']}
            onChange={(e) => setNewStockName(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Exchange"
            value={newStockExchange}
            className={styles['watchlist-form-input']}
            onChange={(e) => setNewStockExchange(e.target.value)}
          />
          <button className={styles['watchlist-form-btn']}>Add</button>
        </form>
      )}
      {/* watchlist not yet created */}
      {!stocks?.[stocks.length - 1]?.watchList && (
        <div className={styles['new-watchlist-form-container']}>
          <form
            className={styles['new-watchlist-form']}
            onSubmit={handleSubmit}
          >
            {stocks.length < 1 && (
              <input
                type="text"
                placeholder="Watchlist"
                value={newStockWatchList}
                className={styles['watchlist-form-input']}
                onChange={(e) => setNewStockWatchList(e.target.value)}
              />
            )}
            <input
              type="text"
              required
              placeholder="Symbol"
              value={newStockSymbol}
              className={styles['watchlist-form-input']}
              onChange={(e) => setNewStockSymbol(e.target.value)}
            />
            <input
              type="text"
              required
              placeholder="Name"
              value={newStockName}
              className={styles['watchlist-form-input']}
              onChange={(e) => setNewStockName(e.target.value)}
            />
            <input
              type="text"
              required
              placeholder="Exchange"
              value={newStockExchange}
              className={styles['watchlist-form-input']}
              onChange={(e) => setNewStockExchange(e.target.value)}
            />
            <button className={styles['watchlist-form-btn']}>Add</button>
          </form>
        </div>
      )}
    </div>
  );
}
