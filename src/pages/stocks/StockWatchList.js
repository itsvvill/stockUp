import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { UilEllipsisV } from '@iconscout/react-unicons';
import { UilTrashAlt } from '@iconscout/react-unicons';
import { UilTimesCircle } from '@iconscout/react-unicons';
import { UilCheckCircle } from '@iconscout/react-unicons';
// styles
import styles from './Stocks.module.css';

export default function StockWatchList({ stocks, user }) {
  const { updateDocument, deleteDocument, response } = useFirestore('stocks');
  const [toggleMenu, setToggleMenu] = useState('');
  const [toggleEdit, setToggleEdit] = useState('');
  const [newStockName, setNewStockName] = useState('');
  const [newStockSymbol, setNewStockSymbol] = useState('');

  const handleToggleMenu = (id) => {
    if (toggleMenu === '') {
      setToggleMenu((prevState) => id);
    } else if (toggleMenu !== id) {
      setToggleMenu((prevState) => id);
    } else {
      setToggleMenu((prevState) => '');
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newStockSymbol, newStockName);
    setToggleEdit((prevState) => '');
    setNewStockSymbol((prevState) => '');
    setNewStockName((prevState) => '');
  };

  return (
    <div className={styles['stock-watchlist-container']}>
      <h1 className={styles['stocks-watchlist-heading']}>Stock WatchList</h1>
      {stocks &&
        stocks.map((stock) => (
          <li key={stock.id} className={styles['stocks-watchlist-item']}>
            {(toggleEdit === '' || toggleEdit !== stock.id) && (
              <>
                <button
                  // onClick={() => console.log(stock.stockName)}
                  className={styles['stocks-watchlist-symbol']}
                >
                  {stock.stockSymbol}
                </button>
                <button
                  onClick={() => setToggleEdit((prevState) => stock.id)}
                  className={styles['stocks-watchlist-name']}
                >
                  {stock.stockName}
                </button>
              </>
            )}
            {toggleEdit === stock.id && (
              <form
                onSubmit={handleSubmit}
                className={styles['stock-watchlist-edit-form']}
              >
                <input
                  type="text"
                  required
                  placeholder={stock.stockSymbol}
                  value={newStockSymbol}
                  className={styles['stock-watchlist-edit-symbol']}
                  onChange={(e) => setNewStockSymbol(e.target.value)}
                />
                <input
                  type="text"
                  required
                  placeholder={stock.stockName}
                  value={newStockName}
                  className={styles['stock-watchlist-edit-name']}
                  onChange={(e) => setNewStockName(e.target.value)}
                />
                <div
                  className={styles['stock-watchlist-edit-button-container']}
                >
                  <button
                    type="submit"
                    className={styles['stock-watchlist-edit-submit']}
                  >
                    <UilCheckCircle size="22" />
                  </button>
                  <button
                    type="button"
                    className={styles['stock-watchlist-edit-cancel']}
                    onClick={() => setToggleEdit((prevState) => '')}
                  >
                    <UilTimesCircle color="red" size="22" />
                  </button>
                </div>
              </form>
            )}
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
