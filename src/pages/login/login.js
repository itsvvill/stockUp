import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { Link } from 'react-router-dom';

// styles and icons
import styles from './Login.module.css';
import { UilGoogle } from '@iconscout/react-unicons';
import { UilFacebook } from '@iconscout/react-unicons';
import { UilEye } from '@iconscout/react-unicons';
import { UilEyeSlash } from '@iconscout/react-unicons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    let buttonType = e.nativeEvent.submitter.value;

    login(email, password, buttonType);
  };

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2 className={styles['login-form-h2']}>Login</h2>
      <label>
        <span className={styles['login-form-span']}>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      {error && error.code === 'auth/invalid-email' && (
        <p className={styles['login-form-p']}>{error.message}</p>
      )}
      <label>
        <span className={styles['login-form-span']}>Password:</span>
        <div className={styles['password']}>
          <input
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!showPassword ? (
            <button
              className={styles['toggle-password']}
              onClick={togglePassword}
            >
              <UilEyeSlash />
            </button>
          ) : (
            <button
              className={styles['toggle-password']}
              onClick={togglePassword}
            >
              <UilEye />
            </button>
          )}
        </div>
      </label>
      {error && error.code === 'auth/wrong-password' && (
        <p className={styles['login-form-p']}>{error.message}</p>
      )}
      {!isPending && (
        <div>
          <button
            name="submit"
            value="Login"
            className={styles['login-form-button-login']}
          >
            Login
          </button>
          <button
            name="submit"
            value="Google"
            className={styles['login-form-button']}
          >
            <UilGoogle size="25" color="#121212" />
          </button>
          <button
            name="submit"
            value="Facebook"
            className={styles['login-form-button']}
          >
            <UilFacebook size="25" color="#1880C5" />
          </button>
        </div>
      )}
      {isPending && (
        <button className={styles['login-form-button']} disabled>
          Loading
        </button>
      )}
      <p className={styles['signup-p']}>
        First time here?{' '}
        <span className={styles['signup-link']}>
          <Link to="/signup">Signup</Link>
        </span>
      </p>
    </form>
  );
}
