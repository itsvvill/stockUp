import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { UilEyeSlash } from '@iconscout/react-unicons';
import { UilEye } from '@iconscout/react-unicons';

// styles and icons
import styles from './Login.module.css';
import { UilGoogle } from '@iconscout/react-unicons';
import { UilFacebook } from '@iconscout/react-unicons';

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
      {error && error.code === 'auth/wrong-password' && <p>{error.message}</p>}
      {!isPending && (
        <div>
          <button name="submit" value="Login" className="btn">
            Login
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
          Loading
        </button>
      )}
    </form>
  );
}
