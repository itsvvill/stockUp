import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

//styles
import styles from './Home.module.css';
// components and pages
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import CategoryFilter from './CategoryFilter';

export default function Home() {
  const [currentCategory, setCurrentCategory] = useState('All');
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    'transactions',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );
  const transactions = documents
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

  const changeCategory = (newCategory) => {
    setCurrentCategory(newCategory);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}

        {documents && documents.length > 0 && (
          <>
            <CategoryFilter
              currentCategory={currentCategory}
              changeCategory={changeCategory}
              categories={categoryList}
            />
            <TransactionList transactions={transactions} />
          </>
        )}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} categories={categoryList.slice(1)} />
      </div>
    </div>
  );
}
