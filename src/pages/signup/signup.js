import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { Link } from 'react-router-dom';

//styles and icons
import styles from './Signup.module.css';
import logo from '../../components/logo.png';
import { UilGoogle } from '@iconscout/react-unicons';
import { UilFacebook } from '@iconscout/react-unicons';
import { UilEye } from '@iconscout/react-unicons';
import { UilEyeSlash } from '@iconscout/react-unicons';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, error, isPending } = useSignup();

  // fires useSignup hook
  const handleSubmit = (e) => {
    e.preventDefault();
    let buttonType = e.nativeEvent.submitter.value;
    signUp(email, password, displayName, buttonType);
  };
  // toggles password from hidden to visible
  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2 className={styles['signup-form-h2']}>
        <img src={logo} className={styles['logo']} alt="StockUp Logo" />
        tockUp
      </h2>
      <label>
        <span className={styles['signup-form-span']}>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      {/* email related error */}
      {error && error.code === 'auth/invalid-email' && (
        <p className={styles['signup-form-error']}>{error.message}</p>
      )}
      <label>
        <span className={styles['signup-form-span']}>Password:</span>
        <div className={styles['password']}>
          <input
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {/* password visibility is hidden/visible */}
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
      {/* password related error */}
      {error && error.code === 'auth/weak-password' && (
        <p className={styles['signup-form-error']}>{error.message}</p>
      )}
      <label>
        <span className={styles['signup-form-span']}>Display Name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      {/* normal state */}
      {!isPending && (
        <div>
          <button
            name="submit"
            value="Signup"
            className={styles['signup-form-btn-signup']}
          >
            Sign Up
          </button>
          <button
            name="submit"
            value="Google"
            className={styles['signup-form-btn']}
          >
            <UilGoogle size="25" color="#121212" />
          </button>
          <button
            name="submit"
            value="Facebook"
            className={styles['signup-form-btn']}
          >
            <UilFacebook size="25" color="#1880C5" />
          </button>
        </div>
      )}
      {/* pending state */}
      {isPending && (
        <button className={styles['signup-form-btn']} disabled>
          Loading...
        </button>
      )}
      <p className={styles['login-p']}>
        Already have an account?{' '}
        <span className={styles['login-link']}>
          <Link to="/login">Login</Link>
        </span>
      </p>
    </form>
  );
}
