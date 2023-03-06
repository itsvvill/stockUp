import { useAuthContext } from '../../hooks/useAuthContext';
// styles
import styles from './User.module.css';

export default function User() {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.intro}>
          Hi, {user.displayName ? user.displayName : 'Guest'} (
          {user.email ? user.email : 'guest@guestdemo.com'})
        </h1>
        <p className={styles.instructions}>
          Adjust your preferred settings here.
        </p>
        <h2 className={styles.section}>Change Name</h2>
        <input
          type="text"
          required
          placeholder={user.displayName ? user.displayName : 'Guest'}
        />
        <button disabled>Update Name</button>
        <h2 className={styles.section}>Add Profile Image</h2>
        <button disabled>Add New Image</button>

        <h2 className={styles.section}>Account Management</h2>
        <button className={styles.delete} disabled>
          Delete Account
        </button>
      </div>
    </div>
  );
}
