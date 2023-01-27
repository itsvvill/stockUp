import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';

// styles
import styles from './Stocks.module.css';

export default function StockWatchList({
  stockSymbol,
  stockName,
  stockExchange,
  toggleStockWatchList,
}) {
  const { addDocument, response } = useFirestore('stocks');
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    'stocks',
    ['uid', '==', user.uid],
    ['name', 'desc']
  );
  const [newStockSymbol, setNewStockSymbol] = useState('');
  const [newStockName, setNewStockName] = useState('');
  const [newStockExchange, setNewStockExchange] = useState('');

  const uid = user.uid;

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({ stockName, stockSymbol, uid });
  };
  useEffect(() => {
    if (response.success) {
      toggleStockWatchList((prevState) => !prevState);
    }
  }, [response.success, toggleStockWatchList]);
  return (
    <div className={styles['watchlist-container']}>
      {stockName && (
        <form className={styles['watchlist-form']} onSubmit={handleSubmit}>
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
          <button className={styles['watchlist-form-btn']}>
            Add To WatchList
          </button>
        </form>
      )}
    </div>
  );
}
