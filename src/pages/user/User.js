import { useDeleteUser } from '../../hooks/useDeleteUser';
import { useAuthContext } from '../../hooks/useAuthContext';
// styles
import styles from './User.module.css';

export default function User() {
  const { deleteUser, error, isPending } = useDeleteUser();
  const { user } = useAuthContext();

  const handleDelete = (e) => {
    e.preventDefault();
    deleteUser();
    if (error) console.log(error);
  };
  return (
    <>
      {!user.isAnonymous && (
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
              className={styles.input}
              type="text"
              required
              placeholder={user.displayName ? user.displayName : 'Guest'}
            />
            <button className={styles.button} disabled>
              Update Name
            </button>
            <h2 className={styles.section}>Add Profile Image</h2>
            <button className={styles.button} disabled>
              Add New Image
            </button>

            <h2 className={styles.section}>Account Management</h2>
            {!isPending && (
              <button
                className={styles.delete}
                onClick={(e) => handleDelete(e)}
              >
                Delete Account
              </button>
            )}
            {isPending && (
              <button
                className={styles.delete}
                disabled
                onClick={(e) => handleDelete(e)}
              >
                Deleting...
              </button>
            )}
            {error && <p>Sorry, something went wrong...</p>}
          </div>
        </div>
      )}

      {user.isAnonymous && (
        <div className={styles.container}>
          <div className={styles.card}>
            <h1 className={styles.intro}>
              Hi, {user.displayName ? user.displayName : 'Guest'} (
              {user.email ? user.email : 'guest@guestdemo.com'})
            </h1>
            <p className={styles.instructions}>
              Sorry, these features are reserved for users.
            </p>
            <h2 className={styles.section}>Change Name</h2>
            <input
              className={styles.input}
              type="text"
              required
              placeholder={user.displayName ? user.displayName : 'Guest'}
            />
            <button className={styles.button} disabled>
              Update Name
            </button>
            <h2 className={styles.section}>Add Profile Image</h2>
            <button className={styles.button} disabled>
              Add New Image
            </button>
            <h2 className={styles.section}>Account Management</h2>
            <button
              className={styles.delete}
              disabled
              onClick={(e) => handleDelete(e)}
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
    </>
  );
}
