import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { UilEllipsisV } from '@iconscout/react-unicons';
import { UilTrashAlt } from '@iconscout/react-unicons';
// styles
import styles from './Stocks.module.css';

export default function StockWatchList({ stocks }) {
  const { deleteDocument } = useFirestore('stocks');
  const [toggleMenu, setToggleMenu] = useState('');

  const handleToggleMenu = (id) => {
    if (toggleMenu === '') {
      setToggleMenu((prevState) => id);
    } else if (toggleMenu !== id) {
      setToggleMenu((prevState) => id);
    } else {
      setToggleMenu((prevState) => '');
    }
  };
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
            <div className={styles['stock-watchlist-button-container']}>
              {toggleMenu === stock.id && (
                <button
                  className={styles['stock-watchlist-delete']}
                  onClick={() => deleteDocument(stock.id)}
                >
                  <UilTrashAlt size="24" />
                </button>
              )}
              <button
                className={styles['stock-watchlist-menu']}
                onClick={() => handleToggleMenu(stock.id)}
              >
                <UilEllipsisV size="22" />
              </button>
            </div>
          </li>
        ))}
    </div>
  );
}
