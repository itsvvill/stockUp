//styles
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
    <div className={styles['category-filter-container']}>
      <nav className={styles['category-filter']}>
        {categories.map((c, idx) => (
          <button
            key={`${c}_${idx}`}
            onClick={() => handleClick(c)}
            className={
              currentCategory === c
                ? styles['active-btn']
                : styles['category-btn']
            }
          >
            {c}
          </button>
        ))}
      </nav>
    </div>
  );
}
