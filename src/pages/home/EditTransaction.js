import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { UilTimesCircle } from '@iconscout/react-unicons';
import { UilCheckCircle } from '@iconscout/react-unicons';

// styles
import styles from './Home.module.css';
const categoryList = [
  'All',
  'Auto Maintenance',
  'Cellphone',
  'Eating Out',
  'Education',
  'Electricity',
  'Entertainment',
  'Gifts',
  'Groceries',
  'Health & Wellness',
  'Hobbies',
  'Home Improvement',
  'Home Maintenance',
  'Internet',
  'Miscellaneous',
  'Other',
  'Rent/Mortgage',
  'Transportation',
  'Vacation',
  'Water',
];
export default function EditTransaction({
  transaction,
  name,
  amount,
  date,
  category,
  toggleEditing,
}) {
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newColor, setNewColor] = useState('#effaf0');
  const { updateDocument, response } = useFirestore('transactions');
  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    let uid = user.uid;
    // addDocument({
    //   uid,
    //   name,
    //   amount,
    //   date,
    //   category,
    //   color,
    // });
    console.log(uid, newName, newAmount, newDate, newCategory, newColor);
  };
  const handleClick = () => {
    toggleEditing('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <li
        key={transaction.id}
        style={{ borderLeft: `4px solid ${transaction.color}` }}
      >
        <input
          type="text"
          required
          placeholder={transaction.name}
          value={newName}
          className={styles['edit-name']}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="number"
          required
          placeholder={'$' + transaction.amount}
          value={newAmount}
          className={styles['edit-amount']}
          onChange={(e) => setNewAmount(e.target.value)}
        />
        <input
          type="date"
          required
          value={newDate}
          placeholder={transaction.date}
          className={styles.date}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <select
          required
          onChange={(e) => setNewCategory(e.target.value)}
          value={newCategory}
          className={styles.category}
        >
          <option value="">- Choose a category -</option>
          {categoryList.map((c) => (
            <option value={c} key={c}>
              {c}
            </option>
          ))}
        </select>
        <button type="submit" className={styles['edit-button']}>
          <UilCheckCircle size="23" color="#000" />
        </button>
        <button
          type="button"
          onClick={handleClick}
          className={styles['cancel-button']}
        >
          <UilTimesCircle size="23" color="#000" />
        </button>
      </li>
    </form>
  );
}
