import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

// styles
import styles from './Stocks.module.css';

export default function StockWatchList({
  stockSymbol,
  stockName,
  stockExchange,
}) {
  const { addDocument, response } = useFirestore('stocks');
  const { user } = useAuthContext();
  const [newStockSymbol, setNewStockSymbol] = useState('');
  const [newStockName, setNewStockName] = useState('');
  const [newStockExchange, setNewStockExchange] = useState('');

  function addToWatchList(e) {
    e.preventDefault();
    console.log({ name: newStockName, symbol: newStockSymbol, uid: user.uid });
    // addDocument({ name: stockName, symbol: stockSymbol, uid: user.uid });
  }
  return (
    <div>
      {stockName && (
        <form id="watchList" onSubmit={addToWatchList}>
          <input
            type="text"
            required
            placeholder={stockSymbol}
            value={newStockSymbol}
            // className={styles['edit-name']}
            onChange={(e) => setNewStockSymbol(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder={stockName}
            value={newStockName}
            // className={styles['edit-name']}
            onChange={(e) => setNewStockName(e.target.value)}
          />
          <button type="submit">Add To WatchList</button>
        </form>
      )}
    </div>
  );
}
