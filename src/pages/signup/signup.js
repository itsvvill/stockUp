import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { Link } from 'react-router-dom';

//styles and icons
import styles from './Signup.module.css';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let buttonType = e.nativeEvent.submitter.value;

    signUp(email, password, displayName, buttonType);
  };

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  };
  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
      <h2 className={styles['signup-form-h2']}>Sign Up</h2>
      <label>
        <span className={styles['signup-form-span']}>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
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
          {!showPassword ? (
            <UilEyeSlash
              className={styles['toggle-password']}
              onClick={togglePassword}
            />
          ) : (
            <UilEye
              className={styles['toggle-password']}
              onClick={togglePassword}
            />
          )}
        </div>
      </label>
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
      <p className={styles['login-p']}>
        Already have an account?{' '}
        <span className={styles['login-link']}>
          <Link to="/login">Login</Link>
        </span>
      </p>
    </form>
  );
}
