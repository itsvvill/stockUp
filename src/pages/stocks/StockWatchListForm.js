import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

// styles
import styles from './Stocks.module.css';

export default function StockWatchList({
  uid,
  stockSymbol,
  stockName,
  stockExchange,
  toggleStockWatchList,
}) {
  const { addDocument, response } = useFirestore('stocks');

  const [newStockWatchList, setNewStockWatchList] = useState('Stock Watchlist');
  const [newStockSymbol, setNewStockSymbol] = useState('');
  const [newStockName, setNewStockName] = useState('');
  const [newStockExchange, setNewStockExchange] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDocument = {
      stockName: newStockName,
      stockSymbol: newStockSymbol,
      stockExchange: newStockExchange,
      uid: uid,
    };
    addDocument(newDocument);
  };
  useEffect(() => {
    if (response.success) {
      toggleStockWatchList((prevState) => !prevState);
    }
  }, [response.success, toggleStockWatchList]);
  return (
    <div className={styles['watchlist-form-container']}>
      {stockName && (
        <form className={styles['watchlist-form']} onSubmit={handleSubmit}>
          <input
            type="text"
            palceholder="Enter a watchlist name"
            value={newStockWatchList}
            onChange={(e) => setNewStockWatchList(e.target.value)}
          />
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
      {!stockName && (
        <form className={styles['watchlist-form']} onSubmit={handleSubmit}>
          <input
            type="text"
            palceholder="Enter a watchlist name"
            value={newStockWatchList}
            onChange={(e) => setNewStockWatchList(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Enter a stock symbol"
            value={newStockSymbol}
            className={styles['watchlist-form-input']}
            onChange={(e) => setNewStockSymbol(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Enter a stock name"
            value={newStockName}
            className={styles['watchlist-form-input']}
            onChange={(e) => setNewStockName(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Enter stock exchange"
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
