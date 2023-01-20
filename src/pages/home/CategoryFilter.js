//styles
import styles from './Home.module.css';

export default function CategoryFilter({
  currentCategory,
  changeCategory,
  categories,
}) {
  const handleClick = (newCategory) => {
    changeCategory(newCategory);
  };

  return (
    <div>
      <nav className={styles['category-filter']}>
        {categories.map((c) => (
          <button
            key={c}
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
