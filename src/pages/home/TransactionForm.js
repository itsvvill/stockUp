import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

export default function TransactionForm({ uid }) {
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
            <option value="Miscellaneous">Miscellaneous</option>
            <option value="Rent/Mortgage">Rent/Mortgage</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Internet">Internet</option>
            <option value="Cellphone">Cellphone</option>
            <option value="Groceries">Groceries</option>
            <option value="Eating Out">Eating Out</option>
            <option value="Transportation">Transportation</option>
            <option value="Home Maintenance">Home Maintenance</option>
            <option value="Auto Maintenance">Auto Maintenance</option>
            <option value="Gifts">Gifts</option>
            <option value="Vacation">Vacation</option>
            <option value="Education">Education</option>
            <option value="Home Improvement">Home Improvement</option>
            <option value="Hobbies">Hobbies</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Health & Wellness">Health & Wellness</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <button>Add Transaction</button>
      </form>
    </>
  );
}
