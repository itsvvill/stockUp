import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

//styles and icons
import styles from './Home.module.css';
import { UilDollarSignAlt } from '@iconscout/react-unicons';
import { UilCalendarAlt } from '@iconscout/react-unicons';
import { UilLetterEnglishA } from '@iconscout/react-unicons';

// components and pages
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import CategoryFilter from './CategoryFilter';

export default function Home() {
  const [currentCategory, setCurrentCategory] = useState('All');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    'transactions',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );
  let transactions = documents
    ? documents.filter((transaction) => {
        switch (currentCategory) {
          case 'All':
            return true;
          case 'Auto Maintenance':
          case 'Cellphone':
          case 'Eating Out':
          case 'Education':
          case 'Electricity':
          case 'Entertainment':
          case 'Gifts':
          case 'Groceries':
          case 'Health & Wellness':
          case 'Hobbies':
          case 'Home Improvement':
          case 'Home Maintenance':
          case 'Internet':
          case 'Miscellaneous':
          case 'Other':
          case 'Rent/Mortgage':
          case 'Transportation':
          case 'Vacation':
          case 'Water':
            return transaction.category === currentCategory;
          default:
            return true;
        }
      })
    : null;
  const categoryList = [
    'All',
    'Auto Maintenance',
    'Cellphone',
    'Eating Out',
    'Education',
    'Electricity',
    'Entertainment',
    'Gifts',
    'Groceries',
    'Health & Wellness',
    'Hobbies',
    'Home Improvement',
    'Home Maintenance',
    'Internet',
    'Miscellaneous',
    'Other',
    'Rent/Mortgage',
    'Transportation',
    'Vacation',
    'Water',
  ];

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

  const changeCategory = (newCategory) => {
    setCurrentCategory(newCategory);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}

        {documents && documents.length > 0 && (
          <>
            <div className={styles['transaction-filter-container']}>
              <button onClick={handleClick} value="amount">
                <UilDollarSignAlt />
              </button>
              <button onClick={handleClick} value="date">
                <UilCalendarAlt />
              </button>
              <button onClick={handleClick} value="name">
                <UilLetterEnglishA />
              </button>
            </div>
            <CategoryFilter
              currentCategory={currentCategory}
              changeCategory={changeCategory}
              categories={categoryList}
            />
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
        <TransactionForm uid={user.uid} categories={categoryList.slice(1)} />
      </div>
    </div>
  );
}
