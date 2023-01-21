import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { UilTrash } from '@iconscout/react-unicons';
import { UilEdit } from '@iconscout/react-unicons';
import { UilEllipsisV } from '@iconscout/react-unicons';

// styles
import styles from './Home.module.css';

export default function TransactionList({
  transactions,
  transactionFilter,
  isAscending,
}) {
  const { deleteDocument } = useFirestore('transactions');
  const [deleteClicked, setDeleteClicked] = useState(false);
  // const [editClicked, setEditClicked] = useState(false);

  // sorting transactions by amount, date, name, (all asc or desc)
  function getSortedTransactions(transactions, filter, ascending = true) {
    if (filter === '') return transactions;
    if (ascending) {
      if (filter === 'date') {
        return transactions
          .map((transaction) => transaction)
          .sort(
            (a, b) =>
              Number(a[filter].split('-').join('')) -
              Number(b[filter].split('-').join(''))
          );
      } else if (filter === 'name') {
        return transactions
          .map((transaction) => transaction)
          .sort((a, b) => {
            const aString = a[filter].toLowerCase();
            const bString = b[filter].toLowerCase();
            if (aString < bString) {
              return -1;
            }
            if (aString > bString) {
              return 1;
            }
            return 0;
          });
      }
      return transactions
        .map((transaction) => transaction)
        .sort((a, b) => Number(a[filter]) - Number(b[filter]));
    } else {
      if (filter === 'date') {
        return transactions
          .map((transaction) => transaction)
          .sort(
            (a, b) =>
              Number(b[filter].split('-').join('')) -
              Number(a[filter].split('-').join(''))
          );
      } else if (filter === 'name') {
        return transactions
          .map((transaction) => transaction)
          .sort((a, b) => {
            const aString = a[filter].toLowerCase();
            const bString = b[filter].toLowerCase();
            if (aString < bString) {
              return 1;
            }
            if (aString > bString) {
              return -1;
            }
            return 0;
          });
      }
      return transactions
        .map((transaction) => transaction)
        .sort((a, b) => Number(b[filter]) - Number(a[filter]));
    }
  }
  const sortedTransactions = getSortedTransactions(
    transactions,
    transactionFilter,
    isAscending
  );
  return (
    <ul className={styles.transactions}>
      {sortedTransactions.map((transaction) => (
        <li
          key={transaction.id}
          style={{ borderLeft: `4px solid ${transaction.color}` }}
        >
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <p className={styles.date}>{transaction.date}</p>
          <p className={styles.category}>{transaction.category}</p>
          {deleteClicked && (
            <>
              <button
                className={styles.clicked}
                onClick={() => deleteDocument(transaction.id)}
              >
                <UilTrash size="23" color="#000" />
              </button>
              <button
                className={styles.edit}
                onClick={() => deleteDocument(transaction.id)}
              >
                <UilEdit size="23" color="#000" />
              </button>
            </>
          )}
          <button
            className={styles.delete}
            onClick={() => setDeleteClicked(!deleteClicked)}
          >
            <UilEllipsisV size="23" color="#777" />
          </button>
        </li>
      ))}
    </ul>
  );
}
