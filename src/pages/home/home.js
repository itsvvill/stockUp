import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

//styles and icons
import styles from './Home.module.css';
import { UilDollarSignAlt } from '@iconscout/react-unicons';
import { UilCalendarAlt } from '@iconscout/react-unicons';
import { UilLetterEnglishA } from '@iconscout/react-unicons';
import { UilInfoCircle } from '@iconscout/react-unicons';

// components and pages
import TransactionForm from './TransactionForm';
import TransactionInfo from './TransactionInfo';
import TransactionList from './TransactionList';
import CategoryFilter from './CategoryFilter';
import { categoryList } from './categoryList';

export default function Home() {
  const [currentCategory, setCurrentCategory] = useState('All');
  const [showInfo, setShowInfo] = useState(false);
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
    }
  };

  // sets a new category to filter by
  const changeCategory = (newCategory) => {
    setCurrentCategory(newCategory);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {/* shows category filter if 1 or more documents */}
        {documents && documents.length > 0 && (
          <>
            <div className={styles['transaction-filter-container']}>
              <button
                onClick={handleClick}
                value="amount"
                className={
                  amount !== '' ? styles['button-active'] : styles['button']
                }
              >
                <UilDollarSignAlt />
              </button>
              <button
                onClick={handleClick}
                value="date"
                className={
                  date !== '' ? styles['button-active'] : styles['button']
                }
              >
                <UilCalendarAlt />
              </button>
              <button
                onClick={handleClick}
                value="name"
                className={
                  name !== '' ? styles['button-active'] : styles['button']
                }
              >
                <UilLetterEnglishA />
              </button>
              {transactions.length >= 1 && (
                <button
                  className={
                    showInfo ? styles['button-active'] : styles['button']
                  }
                  onClick={() => setShowInfo((prevState) => !prevState)}
                >
                  <UilInfoCircle />
                </button>
              )}
              {transactions.length < 1 && (
                <button
                  disabled
                  className={styles['button']}
                  onClick={() => setShowInfo((prevState) => !prevState)}
                >
                  <UilInfoCircle />
                </button>
              )}
            </div>
            <CategoryFilter
              currentCategory={currentCategory}
              changeCategory={changeCategory}
              categories={defaultCategories ? defaultCategories : categoryList}
            />
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
    </div>
  );
}
