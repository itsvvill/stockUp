import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { UilTrash } from '@iconscout/react-unicons';
import { UilEdit } from '@iconscout/react-unicons';
import { UilEllipsisV } from '@iconscout/react-unicons';

// styles
import styles from './Home.module.css';
import EditTransaction from './EditTransaction';

export default function TransactionList({
  transactions,
  amount,
  date,
  name,
  categories,
}) {
  const { deleteDocument } = useFirestore('transactions');
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [editClicked, setEditClicked] = useState('');

  // sorting transactions by amount, date, name ( asc or desc)
  function getSortedTransactions(transactions, amount, date, name) {
    // early return for original state
    if (amount === '' && date === '' && name === '') return transactions;
    // date ascending
    else if (date === 'asc') {
      return transactions
        .map((transaction) => transaction)
        .sort(
          (a, b) =>
            Number(a['date'].split('-').join('')) -
            Number(b['date'].split('-').join(''))
        );
      // date descending
    } else if (date === 'desc') {
      return transactions
        .map((transaction) => transaction)
        .sort(
          (a, b) =>
            Number(b['date'].split('-').join('')) -
            Number(a['date'].split('-').join(''))
        );
      // name ascending
    } else if (name === 'asc') {
      return transactions
        .map((transaction) => transaction)
        .sort((a, b) => {
          const aString = a['name'].toLowerCase();
          const bString = b['name'].toLowerCase();
          if (aString < bString) {
            return -1;
          }
          if (aString > bString) {
            return 1;
          }
          return 0;
        });
      // name descending
    } else if (name === 'desc') {
      return transactions
        .map((transaction) => transaction)
        .sort((a, b) => {
          const aString = a['name'].toLowerCase();
          const bString = b['name'].toLowerCase();
          if (aString < bString) {
            return 1;
          }
          if (aString > bString) {
            return -1;
          }
          return 0;
        });
      // amount ascending
    } else if (amount === 'asc') {
      return transactions
        .map((transaction) => transaction)
        .sort((a, b) => {
          let aNum = a['amount'];
          let bNum = b['amount'];
          if (aNum[0] === '0') {
            aNum = aNum.slice(1);
          }
          if (bNum[0] === '0') {
            bNum = bNum.slice(1);
          }
          return Number(aNum) - Number(bNum);
        });
      // amount descending
    } else if (amount === 'desc') {
      return transactions
        .map((transaction) => transaction)
        .sort((a, b) => {
          let aNum = a['amount'];
          let bNum = b['amount'];
          if (aNum[0] === '0') {
            aNum = aNum.slice(1);
          }
          if (bNum[0] === '0') {
            bNum = bNum.slice(1);
          }
          return Number(bNum) - Number(aNum);
        });
    }
  }

  const toggleEditing = () => {
    setEditClicked('');
  };

  const sortedTransactions = getSortedTransactions(
    transactions,
    amount,
    date,
    name
  );
  return (
    <ul className={styles.transactions}>
      {sortedTransactions.map((transaction) => (
        <>
          {editClicked === transaction.id ? (
            <EditTransaction
              key={transaction.id}
              transaction={transaction}
              name={transaction.name}
              amount={transaction.amount}
              date={transaction.date}
              category={transaction.category}
              color={transaction.color}
              toggleEditing={toggleEditing}
            />
          ) : (
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
                    onClick={() => setEditClicked(transaction.id)}
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
          )}
        </>
      ))}
    </ul>
  );
}
