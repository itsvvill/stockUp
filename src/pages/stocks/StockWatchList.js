import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { UilEllipsisV } from '@iconscout/react-unicons';
import { UilTrashAlt } from '@iconscout/react-unicons';
import { UilTimesCircle } from '@iconscout/react-unicons';
import { UilCheckCircle } from '@iconscout/react-unicons';
import { UilPlusCircle } from '@iconscout/react-unicons';

// styles
import styles from './Stocks.module.css';

export default function StockWatchList({
  stocks,
  user,
  toggleStockWatchList,
  toggleNewStockSymbol,
  fetchData,
}) {
  const { updateDocument, deleteDocument, response } = useFirestore('stocks');
  const [toggleMenu, setToggleMenu] = useState('');
  const [toggleEdit, setToggleEdit] = useState('');
  const [titleEdit, setTitleEdit] = useState(false);
  const [newStockWatchList, setNewStockWatchList] = useState('');
  const [newStockName, setNewStockName] = useState('');
  const [newStockSymbol, setNewStockSymbol] = useState('');
  const [newStockExchange, setNewStockExchange] = useState('');
  const [stockData, setStockData] = useState({});

  const FINNHUBAPI = process.env.REACT_APP_FINNHUB;

  const handleToggleMenu = (id) => {
    if (toggleMenu === '') {
      setToggleMenu((prevState) => id);
    } else if (toggleMenu !== id) {
      setToggleMenu((prevState) => id);
    } else {
      setToggleMenu((prevState) => '');
    }
  };

  const handleWatchListSubmit = async (e) => {
    e.preventDefault();
    console.log(newStockWatchList);
    setNewStockWatchList((prevState) => '');
    setTitleEdit((prevState) => !prevState);
  };

  const handleSubmit = async (e, idx) => {
    e.preventDefault();
    let userID = user.uid;
    const editedDoc = {
      createdAt: stocks[idx].createdAt,
      id: toggleEdit,
      stockName: newStockName,
      stockSymbol: newStockSymbol,
      stockExchange: newStockExchange,
      uid: userID,
    };
    await updateDocument(toggleEdit, editedDoc);
    if (!response.error) {
      setToggleEdit((prevState) => '');
      setNewStockSymbol((prevState) => '');
      setNewStockName((prevState) => '');
      setNewStockExchange((prevState) => '');
    }
  };

  useEffect(() => {
    stocks.forEach((stock) => {
      let stockSymbol = stock.stockSymbol;
      let url = `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${FINNHUBAPI}`;
      fetchData(url).then((data) => {
        let newData = data;
        let percent = newData.dp;
        setStockData((prevState) => ({
          ...prevState,
          [stockSymbol]: {
            percent: Math.round(100 * percent) / 100,
            price: newData.c,
            high: newData.h,
            low: newData.l,
            open: newData.o,
          },
        }));
      });
    });
  }, []);

  const getLIStyle = (stock) => {
    if (
      stockData[stock.stockSymbol] &&
      stockData[stock.stockSymbol].percent > 0
    ) {
      return 'green';
    } else if (
      stockData[stock.stockSymbol] &&
      stockData[stock.stockSymbol].percent < 0
    ) {
      return 'red';
    } else {
      return 'grey';
    }
  };

  const handleClick = () => {
    toggleStockWatchList((prevState) => !prevState);
  };

  return (
    <div className={styles['stock-watchlist-container']}>
      <span className={styles['stocks-watchlist-heading']}>
        {!titleEdit && (
          <button
            onClick={() => setTitleEdit((prevState) => true)}
            className={styles['stock-watchlist-heading-title']}
          >
            {stocks[stocks.length - 1].watchList}
          </button>
        )}
        {titleEdit && (
          <div className={styles['stock-watchlist-edit-title-container']}>
            <input
              type="text"
              required
              placeholder={stocks[stocks.length - 1].watchList}
              value={newStockWatchList}
              className={styles['stock-watchlist-edit-title']}
              onChange={(e) => setNewStockWatchList(e.target.value)}
            />
            <div className={styles['stock-watchlist-edit-button-container']}>
              <button
                className={styles['stock-watchlist-edit-submit']}
                type="submit"
                onClick={(e) => handleWatchListSubmit(e)}
              >
                <UilCheckCircle size="22" />
              </button>
              <button
                type="button"
                className={styles['stock-watchlist-edit-cancel']}
                onClick={() => setTitleEdit((prevState) => !prevState)}
              >
                <UilTimesCircle color="red" size="22" />
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => handleClick()}
          className={styles['watchlist-heading-btn']}
        >
          <UilPlusCircle size="22" />
        </button>
      </span>
      {stocks &&
        stocks.map((stock, idx) => (
          <li
            key={stock.id}
            className={styles[`stocks-watchlist-item-` + getLIStyle(stock)]}
          >
            {(toggleEdit === '' || toggleEdit !== stock.id) && (
              <>
                <button
                  onClick={() => toggleNewStockSymbol(stock.stockSymbol)}
                  className={styles['stocks-watchlist-symbol']}
                >
                  {stock.stockSymbol}
                </button>
                <button
                  onClick={() => setToggleEdit((prevState) => stock.id)}
                  className={styles['stocks-watchlist-name']}
                >
                  <div className={styles['stock-watchlist-name-data']}>
                    <span className={styles['stocks-watchlist-name-span']}>
                      {stock.stockName}
                    </span>
                    {stockData[stock.stockSymbol] && (
                      <div className={styles['stock-watchlist-data-container']}>
                        <span className={styles['stocks-watchlist-percent']}>
                          {getLIStyle(stock) === 'green' ? (
                            <span
                              className={styles['stock-watchlist-green-arrow']}
                            >
                              ⬆
                            </span>
                          ) : (
                            <span
                              className={styles['stock-watchlist-red-arrow']}
                            >
                              ⬇
                            </span>
                          )}
                          {stockData[stock.stockSymbol].percent}%
                        </span>
                        <span className={styles['stocks-watchlist-price']}>
                          ${stockData[stock.stockSymbol].price}
                        </span>
                      </div>
                    )}
                  </div>
                </button>
              </>
            )}
            {toggleEdit === stock.id && (
              <form
                onSubmit={(e) => handleSubmit(e, idx)}
                className={styles['stock-watchlist-edit-form']}
              >
                <input
                  type="text"
                  required
                  placeholder={stock.stockSymbol ? stock.stockSymbol : 'Symbol'}
                  value={newStockSymbol}
                  className={styles['stock-watchlist-edit-symbol']}
                  onChange={(e) => setNewStockSymbol(e.target.value)}
                />
                <input
                  type="text"
                  autoFocus
                  required
                  placeholder={stock.stockName ? stock.stockName : 'Stock Name'}
                  value={newStockName}
                  className={styles['stock-watchlist-edit-name']}
                  onChange={(e) => setNewStockName(e.target.value)}
                />
                <input
                  type="text"
                  required
                  placeholder={
                    stock.stockExchange ? stock.stockExchange : 'Exchange'
                  }
                  value={newStockExchange}
                  className={styles['stock-watchlist-edit-exchange']}
                  onChange={(e) => setNewStockExchange(e.target.value)}
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
