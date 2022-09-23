// styles
import styles from './Home.modules.css';

export default function TransactionList({ transactions }) {
  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}></li>
      ))}
    </ul>
  );
}
