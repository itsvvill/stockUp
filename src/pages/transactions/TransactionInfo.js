//styles and icons
import styles from './Home.module.css';

export default function TransactionInfo({ transactions }) {
  // total number of transactions
  let numberOfTransactions = transactions.length;

  // total amount of all transactions
  let total = transactions.reduce((acc, n) => acc + Number(n.amount), 0);

  // average amount of all transactions
  let average = (total / numberOfTransactions).toFixed(2);

  // finds min or max transaction, given "min"/"max" as modifier
  function getMinOrMax(array, modifier) {
    let minOrMax;
    if (modifier === 'max') {
      minOrMax = -Infinity;
      array.forEach(
        (object) => (minOrMax = Math.max(minOrMax, Number(object.amount)))
      );
    } else {
      minOrMax = Infinity;
      array.forEach(
        (object) => (minOrMax = Math.min(minOrMax, Number(object.amount)))
      );
    }
    return minOrMax;
  }

  // finds total number of transactions per category
  function getCategoryTotal(array) {
    let categoryMap = {};
    array.forEach(
      (object) =>
        (categoryMap[object.category] =
          (categoryMap[object.category] || 0) + Number(object.amount))
    );
    return categoryMap;
  }

  return (
    <>
      {transactions.length >= 1 && (
        <ul className={styles['transaction-info']}>
          <li className={styles['transaction-info-item']}>
            Total:
            <span className={styles['transaction-info-number']}>${total}</span>
          </li>
          <li className={styles['transaction-info-item']}>
            Average:
            <span className={styles['transaction-info-number']}>
              ${average}
            </span>
          </li>
          <li className={styles['transaction-info-item']}>
            Largest:
            <span className={styles['transaction-info-number']}>
              ${getMinOrMax(transactions, 'max').toFixed(2)}
            </span>
          </li>
          <li className={styles['transaction-info-item']}>
            Smallest:
            <span className={styles['transaction-info-number']}>
              ${getMinOrMax(transactions, 'min').toFixed(2)}
            </span>
          </li>
        </ul>
      )}
      <ul className={styles['transaction-info-categories']}>
        {Object.entries(getCategoryTotal(transactions))
          .sort()
          .map((thing) => (
            <li className={styles['transaction-info-category-item']}>
              {thing[0]}:
              <span className={styles['transaction-info-number']}>
                ${thing[1].toFixed(2)}
              </span>
            </li>
          ))}
      </ul>
    </>
  );
}
