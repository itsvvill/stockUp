import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

// styles
import styles from './Home.module.css';

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore('transactions');
  const [deleteClicked, setDeleteClicked] = useState(false);

  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          {deleteClicked && (
            <button
              className={styles.clicked}
              onClick={() => deleteDocument(transaction.id)}
            >
              🗑
            </button>
          )}
          <button
            className={styles.delete}
            onClick={() => setDeleteClicked(!deleteClicked)}
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
}
