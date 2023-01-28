import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { UilEllipsisV } from '@iconscout/react-unicons';
import { UilTrash } from '@iconscout/react-unicons';
// styles
import styles from './Stocks.module.css';

export default function StockWatchList({ stocks }) {
  const { deleteDocument } = useFirestore('stocks');
  const [toggleMenu, setToggleMenu] = useState('');

  return (
    <div className={styles['stock-watchlist-container']}>
      <h1 className={styles['stocks-watchlist-heading']}>Stock WatchList</h1>
      {stocks &&
        stocks.map((stock) => (
          <li key={stock.id} className={styles['stocks-watchlist-item']}>
            <button
              // onClick={() => console.log(stock.stockSymbol)}
              className={styles['stocks-watchlist-symbol']}
            >
              {stock.stockSymbol}
            </button>
            <p className={styles['stocks-watchlist-name']}>{stock.stockName}</p>
            {toggleMenu === '' ||
              (toggleMenu !== stock.id && (
                <button onClick={(e) => setToggleMenu(stock.id)}>
                  <UilEllipsisV />
                </button>
              ))}
            {toggleMenu === stock.id && (
              <button onClick={() => deleteDocument(stock.id)}>
                <UilTrash />
              </button>
            )}
          </li>
        ))}
    </div>
  );
}
