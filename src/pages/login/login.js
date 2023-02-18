import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { Link } from 'react-router-dom';

// styles and icons
import styles from './Login.module.css';
import logo from '../../components/logo.png';
import { UilGoogle } from '@iconscout/react-unicons';
import { UilFacebook } from '@iconscout/react-unicons';
import { UilEye } from '@iconscout/react-unicons';
import { UilEyeSlash } from '@iconscout/react-unicons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, error, isPending } = useLogin();

  // fires useLogin hook
  const handleSubmit = (e) => {
    e.preventDefault();
    let buttonType = e.nativeEvent.submitter.value;
    login(email, password, buttonType);
  };

  // toggles password visibility from hidden to visible
  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2 className={styles['login-form-h2']}>
        <img src={logo} className={styles['logo']} alt="StockUp Logo" />
        tockUp
      </h2>
      <h3 className={styles['login-form-h3']}>Welcome back.</h3>
      <p className={styles['login-form-p']}>Login to your account.</p>
      <div className={styles['login-form-div']}>
        <input
          type="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      {/* email related error */}
      {error && error.code === 'auth/invalid-email' && (
        <p className={styles['login-form-error']}>{error.message}</p>
      )}
      <div className={styles['login-form-div']}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {/* hide password visibility */}
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
      {/* password related error */}
      {error && error.code === 'auth/wrong-password' && (
        <p className={styles['login-form-error']}>{error.message}</p>
      )}
      {/* normal state */}
      {!isPending && (
        <div className={styles['login-form-div-buttons']}>
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
      {/* pending state */}
      {isPending && (
        <button className={styles['login-form-button']} disabled>
          Loading...
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
