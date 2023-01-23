import { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

export default function EditTransaction(transaction, categories) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('#effaf0');
  const { updateDocument, response } = useFirestore('transactions');

  return (
    <>
      <input
        type="text"
        required
        placeholder={transaction.name}
        value={transaction.name}
        className={styles.name}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="number"
        required
        placeholder={'$' + transaction.amount}
        value={transaction.name}
        className={styles.amount}
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
        {categories.map((c) => (
          <option value={c} key={c}>
            {c}
          </option>
        ))}
      </select>
    </>
  );
}
