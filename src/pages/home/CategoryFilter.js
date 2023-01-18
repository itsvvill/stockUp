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
    <div className="category-filter">
      <nav>
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
