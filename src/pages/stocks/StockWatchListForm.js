import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { motion } from 'framer-motion';
import API from '../../API';

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
  const [inWatchList, setInWatchList] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // either starts a new stock watchlist, or adds stock to watchlist
  const handleSubmit = async (e) => {
    e.preventDefault();

    //check to see if stock symbol is valid and exists in api
    let data = await API.fetchQuote(newStockSymbol);
    if (data.d === null) {
      setNotFound(true);
      setTimeout(() => {
        setNotFound(false);
        setNewStockName('');
        setNewStockSymbol('');
      }, 2000);
      return;
    }

    // check to see if stock symbol already exists in watchlist
    let duplicateCheck = stocks?.filter(
      (stock) => stock.stockSymbol === newStockSymbol
    );
    if (duplicateCheck?.length >= 1) {
      setInWatchList(true);
      setTimeout(() => {
        setInWatchList(false);
        setNewStockName('');
        setNewStockSymbol('');
      }, 2000);
      return;
    }

    // add stock if passed previous checks
    let logo = await API.fetchProfile(newStockSymbol).then((data) => data.logo);
    const newDocument = {
      watchList: stocks?.[stocks.length - 1]?.watchList
        ? stocks[stocks.length - 1].watchList
        : newStockWatchList === ''
        ? 'Stock Watchlist'
        : newStockWatchList.trim(),
      stockName: newStockName.trim(),
      stockSymbol: newStockSymbol.trim().toUpperCase(),
      stockLogo: logo,
      uid: uid,
    };
    addDocument(newDocument);
  };

  // waits for response and hides stock watchlist form
  useEffect(() => {
    if (response.success) {
      setInWatchList(false);
      setNewStockName('');
      setNewStockSymbol('');
      toggleStockWatchListForm((prevState) => !prevState);
    }
  }, [response.success, toggleStockWatchListForm]);

  return (
    <div className={styles['watchlist-form-container']}>
      {/* watchlist already exists */}
      {stocks?.[stocks.length - 1]?.watchList && (
        <motion.div layout className={styles['form-container']}>
          {inWatchList && (
            <p className={styles.duplicate}>Stock is already in watchlist!</p>
          )}
          {notFound && (
            <p className={styles.duplicate}>Sorry, that stock wasn't found.</p>
          )}
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
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              className={styles['watchlist-form-btn']}
            >
              Add
            </motion.button>
          </form>
        </motion.div>
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
                className={styles['new-watchlist-form-input']}
                onChange={(e) => setNewStockWatchList(e.target.value)}
              />
            )}
            <input
              type="text"
              required
              placeholder="Symbol"
              value={newStockSymbol}
              className={styles['new-watchlist-form-input']}
              onChange={(e) => setNewStockSymbol(e.target.value)}
            />
            <input
              type="text"
              required
              placeholder="Name"
              value={newStockName}
              className={styles['new-watchlist-form-input']}
              onChange={(e) => setNewStockName(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              className={styles['watchlist-form-btn']}
            >
              Add
            </motion.button>
          </form>
        </div>
      )}
    </div>
  );
}
