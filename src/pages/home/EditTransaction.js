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
  const [newName, setNewName] = useState(transaction.newName);
  const [newAmount, setNewAmount] = useState(transaction.newAmount);
  const [newDate, setNewDate] = useState(transaction.newDate);
  const [newCategory, setNewCategory] = useState(transaction.newCategory);
  const [newColor, setNewColor] = useState('');
  const { updateDocument, response } = useFirestore('transactions');
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userid = user.uid;
    const editedDoc = {
      amount: newAmount,
      category: newCategory,
      color: newColor,
      createdAt: transaction.createdAt,
      date: newDate,
      id: transaction.id,
      name: newName,
      uid: userid,
    };
    await updateDocument(transaction.id, editedDoc);
    if (!response.error) {
      toggleEditing('');
    }
  };
  const handleClick = () => {
    toggleEditing('');
  };
  let colorInput = newColor !== '' ? newColor : transaction.color;
  return (
    <form onSubmit={handleSubmit}>
      <li
        key={transaction.id}
        className={styles['edit-li']}
        style={{ borderLeft: `10px solid ${transaction.color}` }}
      >
        <label
          className={styles['edit-color']}
          style={{ backgroundColor: `${colorInput}` }}
        >
          <input
            type="color"
            required
            onChange={(e) => setNewColor(e.target.value)}
            value={transaction.color}
            className={styles['edit-color-input']}
          />
        </label>
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
          className={styles['edit-date']}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <select
          required
          onChange={(e) => setNewCategory(e.target.value)}
          value={newCategory}
          className={styles['edit-category']}
        >
          <option value="">{transaction.category}</option>
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
