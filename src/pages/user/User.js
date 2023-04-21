import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useDeleteUser } from '../../hooks/useDeleteUser';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import { storage } from '../../firebase/config';

// styles
import styles from './User.module.css';

export default function User() {
  const { deleteUser, error, isPending } = useDeleteUser();
  const { updateUser } = useUpdateUser();
  const { user, userError, userPending } = useAuthContext();
  const [name, setName] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  // const [password, setPassword] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser(name);
    if (userError) console.log(error);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    deleteUser();
    if (error) console.log(error);
  };
  const uploadImage = () => {
    if (imageUpload === null) return;
    // deletes previously stored profilePicture
    let storageRef = storage.ref(user?.uid + '/profilePicture/');
    storageRef.listAll().then((listResults) => {
      const promises = listResults.items.map((item) => {
        return item.delete();
      });
      Promise.all(promises);
    });
    //adds the new profile picture
    let imageRef = storage.ref(
      user.uid + '/profilePicture/' + imageUpload.name
    );
    imageRef.put(imageUpload).then((data) => console.log(data));
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
              onChange={(e) => setName(e.target.value)}
              type="text"
              required
              placeholder={user.displayName ? user.displayName : 'Guest'}
            />
            {/* {setName !== '' &&
              user.providerData[0].providerId === 'password' && (
                <input
                  className={styles.input}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                  placeholder={'Password'}
                />
              )} */}
            {!userPending && (
              <button
                className={styles.button}
                onClick={(e) => handleUpdate(e)}
              >
                Update
              </button>
            )}
            {userPending && (
              <button className={styles.button} disabled>
                ...Updating
              </button>
            )}
            <h2 className={styles.section}>Add Profile Image</h2>
            <label for="profile-image" className={styles['button-label']}>
              {imageUpload
                ? imageUpload?.name.substring(0, 15) + '...'
                : 'Choose New Image'}
              <input
                type="file"
                id="profile-image"
                onChange={(e) => {
                  setImageUpload(e.target.files[0]);
                }}
              />
            </label>
            {imageUpload !== null && (
              <button onClick={uploadImage} className={styles.button}>
                Add New Image
              </button>
            )}

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
