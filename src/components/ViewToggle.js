import { motion } from 'framer-motion';

// styles and icons
import styles from './ViewToggle.module.css';
import { UilEdit, UilListUl, UilSearch } from '@iconscout/react-unicons';

export default function ViewToggle({ page, changeView, toggleView }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={styles.toggle}
      onClick={() => changeView((prevState) => !prevState)}
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
