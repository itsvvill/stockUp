import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { motion } from 'framer-motion';

// styles and icons
import styles from './Home.module.css';
import { UilCheckCircle, UilPalette } from '@iconscout/react-unicons';

export default function TransactionForm({ uid, categories }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [color, setColor] = useState('#4cc49a');
  const { addDocument, response, error } = useFirestore('transactions');

  // submits a new transaction item
  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      uid,
      name,
      amount,
      date,
      category,
      color,
    });
    if (!error) {
      setFormSuccess(name);
    }
  };

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName('');
      setAmount('');
      setDate('');
      setCategory('');
      setColor('#effaf0');
    }
    const timer = setTimeout(() => setFormSuccess(''), 3000);
    return () => clearTimeout(timer);
  }, [response.success]);

  return (
    <>
      {formSuccess === '' && <h3>Add a Transaction</h3>}
      {formSuccess && <h3>"{formSuccess}" added!</h3>}
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            placeholder="Enter a transaction name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            step="0.01"
            required
            placeholder="00.00"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <label>
          <span>Date:</span>
          <input
            className={styles.date}
            type="date"
            required
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </label>
        <label>
          <span>Category:</span>
          <select
            required
            className={styles.category}
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="">- Choose a category -</option>
            {categories.map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Color:</span>
          <UilPalette className={styles.brush} size="22" color="#000" />
          <input
            type="color"
            required
            onChange={(e) => setColor(e.target.value)}
            value={color}
          />
        </label>
        {formSuccess === '' && (
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Add Transaction
          </motion.button>
        )}
        {formSuccess && (
          <button disabled>
            <UilCheckCircle size="25" />
            Added <UilCheckCircle size="25" />
          </button>
        )}
      </form>
    </>
  );
}
