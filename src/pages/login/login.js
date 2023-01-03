import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

// styles and icons
import styles from './Login.module.css';
import { UilGoogle } from '@iconscout/react-unicons';
import { UilFacebook } from '@iconscout/react-unicons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && (
        <div className="login-btns">
          <button className="btn">Login</button>
          <button className="btn">
            <UilGoogle size="25" color="#121212" />
          </button>
          <button className="btn">
            <UilFacebook size="25" color="#1880C5" />
          </button>
        </div>
      )}
      {isPending && (
        <button className="btn" disabled>
          Loading
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
