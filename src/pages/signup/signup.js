import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

//styles and icons
import styles from './Signup.module.css';
import { UilGoogle } from '@iconscout/react-unicons';
import { UilFacebook } from '@iconscout/react-unicons';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const { signUp, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    let buttonType = e.nativeEvent.submitter.value;

    signUp(email, password, displayName, buttonType);
  };
  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2>Sign Up</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      {error && error.code === 'auth/invalid-email' && <p>{error.message}</p>}
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {error && error.code === 'auth/weak-password' && <p>{error.message}</p>}
      <label>
        <span>Display Name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      {!isPending && (
        <div>
          <button name="submit" value="Signup" className="btn">
            Sign Up
          </button>
          <button name="submit" value="Google" className="btn">
            <UilGoogle size="25" color="#121212" />
          </button>
          <button name="submit" value="Facebook" className="btn">
            <UilFacebook size="25" color="#1880C5" />
          </button>
        </div>
      )}
      {isPending && (
        <button className="btn" disabled>
          Loading...
        </button>
      )}
    </form>
  );
}
