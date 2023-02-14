import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

// styles and icons
import styles from './Stocks.module.css';
import { UilEllipsisV } from '@iconscout/react-unicons';
import { UilTrashAlt } from '@iconscout/react-unicons';
import { UilTimesCircle } from '@iconscout/react-unicons';
import { UilCheckCircle } from '@iconscout/react-unicons';
import { UilPlusCircle } from '@iconscout/react-unicons';

export default function StockWatchList({
  stocks,
  user,
  toggleStockWatchListForm,
  toggleNewStockSymbol,
  fetchData,
}) {
  const { updateDocument, deleteDocument, response } = useFirestore('stocks');
  const [toggleDeleteIcon, setToggleDeleteIcon] = useState('');
  const [toggleEdit, setToggleEdit] = useState('');
  const [titleEdit, setTitleEdit] = useState(false);
  const [newStockWatchList, setNewStockWatchList] = useState('');
  const [newStockName, setNewStockName] = useState('');
  const [newStockSymbol, setNewStockSymbol] = useState('');
  const [newStockExchange, setNewStockExchange] = useState('');
  const [stockData, setStockData] = useState({});

  // Finnhub API Key
  const FINNHUBAPI = process.env.REACT_APP_FINNHUB;

  // Toggles delete icon for matching ID if clicked
  const handleToggleDeleteIcon = (id) => {
    if (toggleDeleteIcon === '') {
      setToggleDeleteIcon((prevState) => id);
    } else if (toggleDeleteIcon !== id) {
      setToggleDeleteIcon((prevState) => id);
    } else {
      setToggleDeleteIcon((prevState) => '');
    }
  };
  // start new watchlist, or add stock to watchlist if it exists
  const handleWatchListSubmit = async (e) => {
    e.preventDefault();
    if (newStockWatchList === '') {
      setTitleEdit((prevState) => !prevState);
    } else {
      await stocks.forEach((obj) => {
        let objID = obj.id;
        let userID = user.uid;
        let newDocument = {
          createdAt: obj.createdAt,
          id: obj.id,
          stockName: obj.stockName,
          stockSymbol: obj.stockSymbol,
          uid: userID,
          watchList: newStockWatchList,
        };
        updateDocument(objID, newDocument);
      });
      if (!response.error) {
        setNewStockWatchList((prevState) => '');
        setTitleEdit((prevState) => !prevState);
      }
    }
  };

  // Updates information of a single stock after editing
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

  // Finnhub stock data fetch - fires on initial load
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

  // Returns a color based on stock percentage as gain, loss, or no data
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

  // shows stock watchlist form on click
  const handleClick = () => {
    toggleStockWatchListForm((prevState) => !prevState);
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
              {toggleDeleteIcon === stock.id && (
                <button
                  className={styles['stock-watchlist-delete']}
                  onClick={() => deleteDocument(stock.id)}
                >
                  <UilTrashAlt size="24" />
                </button>
              )}
              <button
                className={styles['stock-watchlist-menu']}
                onClick={() => handleToggleDeleteIcon(stock.id)}
              >
                <UilEllipsisV size="22" />
              </button>
            </div>
          </li>
        ))}
    </div>
  );
}
