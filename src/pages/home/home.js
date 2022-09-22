import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

//styles
import styles from './Home.module.css';
// components and pages
import TransactionForm from './TransactionForm';

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection('transactions');
  return (
    <div className={styles.container}>
      <div className={styles.content}>Transaction List</div>
      {error && <p>{error}</p>}
      {documents && <TransactionList transactions={documents} />}
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
