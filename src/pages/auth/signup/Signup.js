import { useState } from 'react';
import { useSignup } from '../../../hooks/useSignup';
import { Link } from 'react-router-dom';

//styles and icons
import styles from './Signup.module.css';
import logo from '../../../components/logo.png';
import google from '../images/google_signup.svg';
import facebook from '../images/facebook_signup.svg';
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
    <div className={styles['form-container']}>
      <form onSubmit={handleSubmit} className={styles['signup-form']}>
        <h2 className={styles['signup-form-h2']}>
          <img src={logo} className={styles['logo']} alt="StockUp Logo" />
          tockUp
        </h2>
        <h3 className={styles['signup-form-h3']}>Welcome!</h3>
        <p className={styles['signup-form-p']}>Create your account.</p>
        {/* email related error */}
        {error && error.code === 'auth/invalid-email' && (
          <p className={styles['signup-form-error']}>{error.message}</p>
        )}
        {/* password related error */}
        {error && error.code === 'auth/weak-password' && (
          <p className={styles['signup-form-error']}>{error.message}</p>
        )}
        <div className={styles['div-container']}>
          <div className={styles['signup-form-div']}>
            <input
              type="email"
              placeholder="Email address"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className={styles['signup-form-div']}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {/* password visibility is hidden/visible */}
            {!showPassword ? (
              <button
                className={styles['toggle-password']}
                onClick={togglePassword}
              >
                <UilEyeSlash size="20" />
              </button>
            ) : (
              <button
                className={styles['toggle-password']}
                onClick={togglePassword}
              >
                <UilEye size="20" />
              </button>
            )}
          </div>
          <div className={styles['signup-form-div']}>
            <input
              type="text"
              placeholder="Display Name"
              autoComplete="nickname"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
          </div>
        </div>
        {/* normal state */}
        <>
          {!isPending && (
            <button
              name="submit"
              value="Signup"
              className={styles['signup-form-button-signup']}
            >
              Sign Up
            </button>
          )}
          {isPending && (
            <button
              name="submit"
              value="Signup"
              disabled
              className={styles['signup-form-button-signup-loading']}
            >
              Loading...
            </button>
          )}
          {!isPending && (
            <div className={styles['signup-form-button-social-container']}>
              <button
                name="submit"
                value="Google"
                className={styles['signup-form-button-social']}
              >
                <img src={google} alt="signup with google" />
              </button>
              <button
                name="submit"
                value="Facebook"
                className={styles['signup-form-button-social']}
              >
                <img src={facebook} alt="signup with facebook" />
              </button>
            </div>
          )}
          {isPending && (
            <div className={styles['signup-form-button-social-container']}>
              <button
                name="submit"
                value="Google"
                disabled
                className={styles['signup-form-button-social-loading']}
              >
                <img src={google} alt="signup with google" />
              </button>
              <button
                name="submit"
                value="Facebook"
                disabled
                className={styles['signup-form-button-social-loading']}
              >
                <img src={facebook} alt="signup with facebook" />
              </button>
            </div>
          )}
          <p className={styles['signup-option-p']}>
            <span className={styles['signup-option-span']}> OR</span>
          </p>
          {!isPending && (
            <button
              name="submit"
              value="guest"
              className={styles['signup-form-button-guest']}
            >
              Guest Acount
            </button>
          )}
          {isPending && (
            <button
              name="submit"
              value="guest"
              disabled
              className={styles['signup-form-button-guest-loading']}
            >
              Loading...
            </button>
          )}
        </>
        <p className={styles['login-p']}>
          Already have an account?{' '}
          <span className={styles['login-link']}>
            <Link to="/login">Login</Link>
          </span>
        </p>
      </form>
    </div>
  );
}
