import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import StockWatchListForm from './StockWatchListForm';
import { motion } from 'framer-motion';
import API from '../../API';

// styles and icons
import styles from './Stocks.module.css';
import { UilEllipsisV } from '@iconscout/react-unicons';
import { UilTrashAlt } from '@iconscout/react-unicons';
import { UilTimesCircle } from '@iconscout/react-unicons';
import { UilCheckCircle } from '@iconscout/react-unicons';
import { UilPlusCircle } from '@iconscout/react-unicons';

export default function StockWatchList({ stocks, user }) {
  const { updateDocument, deleteDocument, response } = useFirestore('stocks');
  const [showStockWatchListForm, setShowStockWatchListForm] = useState(false);
  const [toggleDeleteIcon, setToggleDeleteIcon] = useState('');
  const [toggleEdit, setToggleEdit] = useState('');
  const [titleEdit, setTitleEdit] = useState(false);
  const [newStockWatchList, setNewStockWatchList] = useState('');
  const [newStockName, setNewStockName] = useState('');
  const [newStockSymbol, setNewStockSymbol] = useState('');
  const [stockData, setStockData] = useState({});
  const [toggleData, setToggleData] = useState(false);

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
      uid: userID,
    };
    await updateDocument(toggleEdit, editedDoc);
    if (!response.error) {
      setToggleEdit((prevState) => '');
      setNewStockSymbol((prevState) => '');
      setNewStockName((prevState) => '');
    }
  };

  // if stock has no logo, search for logo url and update
  const handleUpdateLogo = async (e, idx) => {
    e.preventDefault();
    let userID = user.uid;
    let id = stocks[idx].id;
    let stockSymbol = stocks[idx].stockSymbol;
    let logo = await API.fetchProfile(stockSymbol).then((data) => data.logo);
    const editedDoc = {
      createdAt: stocks[idx].createdAt,
      id: id,
      stockName: stocks[idx].stockName,
      stockSymbol: stocks[idx].stockSymbol,
      uid: userID,
      stockLogo: logo,
    };
    await updateDocument(id, editedDoc);
  };

  // Finnhub stock data fetch - fires on initial load
  useEffect(() => {
    stocks.forEach((stock) => {
      let stockSymbol = stock.stockSymbol;
      API.fetchQuote(stockSymbol).then((data) => {
        let newData = data;
        let percent = newData.dp;
        let changeAmount = newData.d;
        setStockData((prevState) => ({
          ...prevState,
          [stockSymbol]: {
            percent: Math.round(100 * percent) / 100,
            price: parseFloat(data.c).toFixed(2),
            high: newData.h,
            low: newData.l,
            open: newData.o,
            change: parseFloat(changeAmount).toFixed(2),
          },
        }));
      });
    });
  }, [stocks]);

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
  const toggleWatchListVisibility = () => {
    setShowStockWatchListForm((prevState) => !prevState);
  };

  return (
    <motion.div layout className={styles['stock-watchlist-container']}>
      {/* stock watchlist title normal state */}
      {!titleEdit && (
        <span className={styles['stocks-watchlist-heading']}>
          <button
            onClick={() => setTitleEdit((prevState) => true)}
            className={styles['stock-watchlist-heading-title']}
          >
            {stocks[stocks.length - 1].watchList}
          </button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleWatchListVisibility()}
            className={styles['watchlist-heading-btn']}
          >
            <UilPlusCircle size="22" />
          </motion.button>
        </span>
      )}
      {/* stock watchlist title editing state */}
      {titleEdit && (
        <span className={styles['stocks-watchlist-heading']}>
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
              <motion.button
                whileHover={{ scale: 1.1 }}
                className={styles['stock-watchlist-edit-submit']}
                type="submit"
                onClick={(e) => handleWatchListSubmit(e)}
              >
                <UilCheckCircle size="22" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                type="button"
                className={styles['stock-watchlist-edit-cancel']}
                onClick={() => setTitleEdit((prevState) => !prevState)}
              >
                <UilTimesCircle color="red" size="22" />
              </motion.button>
            </div>
          </div>
          <button
            disabled
            className={styles['watchlist-heading-btn']}
            style={{ cursor: 'default' }}
          >
            <UilPlusCircle size="22" />
          </button>
        </span>
      )}

      {/* if stocks exist in the watchlist */}
      {stocks &&
        stocks.map((stock, idx) => (
          <motion.li
            layout
            key={stock.id}
            className={styles[`stocks-watchlist-item-` + getLIStyle(stock)]}
          >
            {(toggleEdit === '' || toggleEdit !== stock.id) && (
              <>
                {/* stockLogo is in database */}
                {stock.stockLogo && (
                  <div className={styles['stocks-watchlist-logo-container']}>
                    <img
                      className={styles['stock-watchlist-logo']}
                      src={stock.stockLogo}
                      alt={`${stock.stockName} logo`}
                    />
                  </div>
                )}
                {/* no logo in database */}
                {!stock.stockLogo && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleUpdateLogo(e, idx)}
                    className={styles['stocks-watchlist-symbol']}
                  >
                    {stock.stockSymbol}
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => setToggleEdit((prevState) => stock.id)}
                  className={styles['stocks-watchlist-name']}
                >
                  <div className={styles['stock-watchlist-name-data']}>
                    <span className={styles['stocks-watchlist-name-span']}>
                      {toggleData ? stock.stockName : stock.stockSymbol}
                    </span>
                  </div>
                </motion.button>
                {stockData[stock.stockSymbol] && (
                  <div className={styles['stock-watchlist-data-container']}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setToggleData(!toggleData)}
                      className={styles['stocks-watchlist-percent']}
                    >
                      {getLIStyle(stock) === 'green' ? (
                        <span className={styles['stock-watchlist-green-arrow']}>
                          ⬆
                        </span>
                      ) : (
                        <span className={styles['stock-watchlist-red-arrow']}>
                          ⬇
                        </span>
                      )}
                      {!toggleData &&
                        `${stockData[stock.stockSymbol].percent}%`}
                      {toggleData && `${stockData[stock.stockSymbol].change}`}
                    </motion.button>
                    <span className={styles['stocks-watchlist-price']}>
                      ${stockData[stock.stockSymbol].price}
                    </span>
                  </div>
                )}
              </>
            )}
            {/* editing a single stock in the watchlist */}
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
                <div
                  className={styles['stock-watchlist-edit-button-container']}
                >
                  <motion.button
                    whileHover={{ scale: 1.3 }}
                    type="submit"
                    className={styles['stock-watchlist-edit-submit']}
                  >
                    <UilCheckCircle size="22" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.3 }}
                    type="button"
                    className={styles['stock-watchlist-edit-cancel']}
                    onClick={() => setToggleEdit((prevState) => '')}
                  >
                    <UilTimesCircle color="red" size="22" />
                  </motion.button>
                </div>
              </form>
            )}
            <div className={styles['stock-watchlist-button-container']}>
              {/* menu is clicked on stock */}
              {toggleDeleteIcon === stock.id && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className={styles['stock-watchlist-delete']}
                  onClick={() => deleteDocument(stock.id)}
                >
                  <UilTrashAlt
                    size="22"
                    className={styles['stock-watchlist-delete-icon']}
                  />
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={styles['stock-watchlist-menu']}
                onClick={() => handleToggleDeleteIcon(stock.id)}
              >
                <UilEllipsisV
                  size="22"
                  className={styles['stock-watchlist-menu-icon']}
                />
              </motion.button>
            </div>
          </motion.li>
        ))}
      {showStockWatchListForm && (
        <StockWatchListForm
          uid={user.uid}
          stocks={stocks}
          toggleStockWatchListForm={toggleWatchListVisibility}
        />
      )}
    </motion.div>
  );
}
