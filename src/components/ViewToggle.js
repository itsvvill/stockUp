import { motion } from 'framer-motion';
import { useState } from 'react';
import { UilEdit, UilListUl, UilSearch } from '@iconscout/react-unicons';
import styles from '../pages/transactions/Home.module.css';

export default function ViewToggle({ page }) {
  const [toggleView, setToggleView] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={styles.toggle}
      onClick={() => setToggleView(!toggleView)}
    >
      <span
        className={
          !toggleView ? styles['toggle-search-active'] : styles['toggle-search']
        }
      >
        {page === 'transactions' && (
          <UilSearch size="20" color={!toggleView ? '#333' : '#333'} />
        )}
        {page === 'stocks' && (
          <UilEdit size="20" color={!toggleView ? '#333' : '#333'} />
        )}
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
  );
}
