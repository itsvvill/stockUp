import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';
import { motion } from 'framer-motion';

//styles and icons
import styles from './Home.module.css';
import {
  UilDollarSignAlt,
  UilAngleUp,
  UilAngleDown,
  UilCalendarAlt,
  UilLetterEnglishA,
  UilInfoCircle,
  UilAngleDoubleDown,
  UilEdit,
  UilExclamationCircle,
  UilListUl,
} from '@iconscout/react-unicons';

// components and pages
import TransactionForm from './TransactionForm';
import TransactionInfo from './TransactionInfo';
import TransactionList from './TransactionList';
import CategoryFilter from './CategoryFilter';
import { categoryList } from './categoryList';

export default function TransactionsHome() {
  const [toggleView, setToggleView] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('All');
  const [showInfo, setShowInfo] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const { user } = useAuthContext();

  //get collection of transactions
  const { documents, error } = useCollection(
    'transactions',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );

  //get collection of categories
  const categories = useCollection(
    'categories',
    ['__name__', '==', '0'],
    ['__name__', 'asc']
  );
  const defaultCategories = categories.documents?.[0].categoryList;

  // returns only transactions which match filtered category
  let transactions = documents
    ? documents.filter((transaction) => {
        if (currentCategory === 'All') return true;
        else if (currentCategory === transaction.category) return true;
        else {
          return false;
        }
      })
    : null;

  // sorts transactions based on which icon is clicked
  const handleClick = (e) => {
    e.preventDefault();
    let f = e.target.value;
    if (f === 'amount' && amount === '') {
      setAmount('asc');
      setDate('');
      setName('');
    } else if (f === 'amount' && amount === 'asc') {
      setAmount('desc');
      setDate('');
      setName('');
    } else if (f === 'amount' && amount === 'desc') {
      setAmount('asc');
      setDate('');
      setName('');
    } else if (f === 'date' && date === '') {
      setAmount('');
      setDate('asc');
      setName('');
    } else if (f === 'date' && date === 'asc') {
      setAmount('');
      setDate('desc');
      setName('');
    } else if (f === 'date' && date === 'desc') {
      setAmount('');
      setDate('asc');
      setName('');
    } else if (f === 'name' && name === '') {
      setAmount('');
      setDate('');
      setName('asc');
    } else if (f === 'name' && name === 'asc') {
      setAmount('');
      setDate('');
      setName('desc');
    } else if (f === 'name' && name === 'desc') {
      setAmount('');
      setDate('');
      setName('asc');
    } else if (f === 'drop-down') {
      setShowDropDown((prevState) => !prevState);
    }
  };
  // sets a new category to filter by
  const changeCategory = (newCategory) => {
    setCurrentCategory(newCategory);
  };
  return (
    <div className={styles.container}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={styles.toggle}
        onClick={() => setToggleView(!toggleView)}
      >
        <span
          className={
            !toggleView
              ? styles['toggle-search-active']
              : styles['toggle-search']
          }
        >
          <UilEdit size="20" color={!toggleView ? '#333' : '#333'} />
        </span>
        <span className={styles.line}>|</span>
        <span
          className={
            toggleView ? styles['toggle-list-active'] : styles['toggle-list']
          }
        >
          <UilListUl size="20" color={toggleView ? '#333' : '#333'} />
        </span>
      </motion.button>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {toggleView && documents.length < 1 && (
          <div className={styles.container}>
            <div className={styles['no-transaction-list']}>
              <h1>
                <UilExclamationCircle
                  className={styles.oops}
                  size="25"
                  color="red"
                />
                Your transaction list is empty
                <UilExclamationCircle
                  className={styles.oops}
                  size="25"
                  color="red"
                />
              </h1>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className={styles.click}
                onClick={() => setToggleView(false)}
              >
                Start a new list
              </motion.button>
            </div>
          </div>
        )}
        {/* shows category filter if 1 or more documents */}
        {toggleView && documents && documents.length > 0 && (
          <>
            <div className={styles['transaction-filter-container']}>
              <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={handleClick}
                value="drop-down"
                className={styles['button']}
              >
                <UilAngleDoubleDown size="20" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={handleClick}
                value="amount"
                className={
                  amount !== '' ? styles['button-active'] : styles['button']
                }
              >
                <UilDollarSignAlt size="20" />
                {amount === 'desc' && (
                  <UilAngleUp className={styles.up} size="12" />
                )}
                {amount === 'asc' && (
                  <UilAngleDown className={styles.down} size="12" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={handleClick}
                value="date"
                className={
                  date !== '' ? styles['button-active'] : styles['button']
                }
              >
                <UilCalendarAlt size="20" />
                {date === 'desc' && (
                  <UilAngleUp className={styles.up} size="12" />
                )}
                {date === 'asc' && (
                  <UilAngleDown className={styles.down} size="12" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.2 }}
                onClick={handleClick}
                value="name"
                className={
                  name !== '' ? styles['button-active'] : styles['button']
                }
              >
                <UilLetterEnglishA size="20" />
                {name === 'desc' && (
                  <UilAngleUp className={styles.up} size="12" />
                )}
                {name === 'asc' && (
                  <UilAngleDown className={styles.down} size="12" />
                )}
              </motion.button>
              {transactions.length >= 1 && (
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  className={
                    showInfo ? styles['button-active'] : styles['button']
                  }
                  onClick={() => setShowInfo((prevState) => !prevState)}
                >
                  <UilInfoCircle size="20" />
                </motion.button>
              )}
              {transactions.length < 1 && (
                <button
                  disabled
                  className={styles['button']}
                  onClick={() => setShowInfo((prevState) => !prevState)}
                >
                  <UilInfoCircle size="20" />
                </button>
              )}
            </div>
            {showDropDown && (
              <CategoryFilter
                currentCategory={currentCategory}
                changeCategory={changeCategory}
                categories={
                  defaultCategories ? defaultCategories : categoryList
                }
              />
            )}
            {showInfo && <TransactionInfo transactions={transactions} />}
            <TransactionList
              transactions={transactions}
              amount={amount}
              date={date}
              name={name}
            />
          </>
        )}
      </div>
      {!toggleView && (
        <div className={styles.sidebar}>
          <TransactionForm
            uid={user.uid}
            categories={
              defaultCategories
                ? defaultCategories.slice(1)
                : categoryList.slice(1)
            }
          />
        </div>
      )}
    </div>
  );
}
