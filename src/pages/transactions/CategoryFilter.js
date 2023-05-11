import { motion } from 'framer-motion';

// styles
import styles from './Home.module.css';

export default function CategoryFilter({
  currentCategory,
  changeCategory,
  categories,
}) {
  // if category name is clicked category state changed in Home.js
  const handleClick = (newCategory) => {
    changeCategory(newCategory);
  };

  return (
    <motion.div layout className={styles['category-filter-container']}>
      <motion.nav layout className={styles['category-filter']}>
        {categories.map((c, idx) => (
          <motion.button
            whileHover={{ scale: 1.1, border: '2px solid #333' }}
            key={`${c}_${idx}`}
            onClick={() => handleClick(c)}
            className={
              currentCategory === c
                ? styles['active-btn']
                : styles['category-btn']
            }
          >
            {c}
          </motion.button>
        ))}
      </motion.nav>
    </motion.div>
  );
}
