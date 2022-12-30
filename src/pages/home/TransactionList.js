import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { UilTrash } from '@iconscout/react-unicons';

// styles
import styles from './Home.module.css';

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore('transactions');
  const [deleteClicked, setDeleteClicked] = useState(false);
  const filterList = ['amount', 'date', 'createdAt.seconds', 'name'];

  // need to update fn to work for text, format date for sorting
  function getSortedTransactions(transactions, filter, ascending = true) {
    if (ascending) {
      return transactions
        .map((transaction) => transaction)
        .sort((a, b) => Number(a[filter]) - Number(b[filter]));
    } else {
      return transactions
        .map((transaction) => transaction)
        .sort((a, b) => Number(b[filter]) - Number(a[filter]));
    }
  }
  // console.log(getSortedTransactions(transactions, 'amount', true));
  return (
    <ul className={styles.transactions}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <p className={styles.date}>{transaction.date}</p>
          <p className={styles.category}>{transaction.category}</p>
          {deleteClicked && (
            <button
              className={styles.clicked}
              onClick={() => deleteDocument(transaction.id)}
            >
              <UilTrash size="25" color="#F4F7F9" />
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
