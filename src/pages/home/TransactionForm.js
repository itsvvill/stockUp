import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

export default function TransactionForm({ uid, categories }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const { addDocument, response } = useFirestore('transactions');

  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      uid,
      name,
      amount,
      date,
      category,
    });
  };

  // reset the form fields
  useEffect(() => {
    if (response.success) {
      setName('');
      setAmount('');
      setDate('');
      setCategory('');
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <label>
          <span>Date:</span>
          <input
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
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="">-- Choose an option --</option>
            {categories.map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  );
}
