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
  const [currentCategory, setCurrentCategory] = useState('');
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    'transactions',
    ['uid', '==', user.uid],
    ['createdAt', 'desc']
  );

  const categoryList = [
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
        <CategoryFilter
          currentCategory={currentCategory}
          changeCategory={changeCategory}
          categories={categoryList}
        />
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} categories={categoryList} />
      </div>
    </div>
  );
}
