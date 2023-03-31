import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

// components and pages
import EditTransaction from './EditTransaction';

// styles and icons
import styles from './Home.module.css';
import { UilEdit, UilEllipsisV, UilTrashAlt } from '@iconscout/react-unicons';

export default function TransactionList({ transactions, amount, date, name }) {
  const { deleteDocument } = useFirestore('transactions');
  const [toggleMenu, setToggleMenu] = useState('');
  const [editClicked, setEditClicked] = useState('');

  // sorting transactions by amount, date, name (asc or desc)
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

  // returns to a non-editing state
  const toggleEditing = () => {
    setEditClicked('');
  };

  // toggles edit and delete buttons for matching id
  const handleMenuClick = (id) => {
    if (toggleMenu === '') {
      setToggleMenu((prevState) => id);
    } else {
      setToggleMenu((prevState) => '');
    }
  };
  // returns a list of sorted transactions
  const sortedTransactions = getSortedTransactions(
    transactions,
    amount,
    date,
    name
  );
  // gets unique years of transactions
  let years = [
    ...new Set(
      sortedTransactions.map((transaction) =>
        Number(transaction.date.slice(0, 4))
      )
    ),
  ];
  // gets unique months of transactions
  let months = [
    ...new Set(
      sortedTransactions.map((transaction) =>
        Number(transaction.date.slice(5, 7))
      )
    ),
  ];
  return (
    <ul className={styles.transactions}>
      {sortedTransactions.map((transaction, idx) => (
        <>
          {/* conditionally show EditTransaction component if ID matches transaction item */}
          {editClicked === transaction.id ? (
            <EditTransaction
              transaction={transaction}
              toggleEditing={toggleEditing}
            />
          ) : (
            <li
              key={`${transaction.id}_${idx}`}
              style={{ borderLeft: `10px solid ${transaction.color}` }}
            >
              <p className={styles.name}>{transaction.name}</p>
              <p className={styles.amount}>${transaction.amount}</p>
              <p className={styles.date}>{transaction.date}</p>
              <p className={styles.category}>{transaction.category}</p>
              {/* conditionally show menu buttons if toggleMenu set to id */}
              {toggleMenu === transaction.id && (
                <>
                  <button
                    className={styles.clicked}
                    onClick={() => deleteDocument(transaction.id)}
                  >
                    <UilTrashAlt size="18" color="#000" />
                  </button>
                  <button
                    className={styles.edit}
                    onClick={() => setEditClicked(transaction.id)}
                  >
                    <UilEdit size="18" color="#000" />
                  </button>
                </>
              )}
              <button
                className={styles.delete}
                onClick={() => handleMenuClick(transaction.id)}
              >
                <UilEllipsisV size="18" color="#777" />
              </button>
            </li>
          )}
        </>
      ))}
    </ul>
  );
}
