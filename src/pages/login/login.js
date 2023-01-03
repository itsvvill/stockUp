import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { projectAuth, googleAuth } from '../../firebase/config';

// styles and icons
import styles from './Login.module.css';
import { UilGoogle } from '@iconscout/react-unicons';
import { UilFacebook } from '@iconscout/react-unicons';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isPending } = useLogin();

  //Sign in with Google
  const GoogleLogin = (e) => {
    e.preventDefault();
    projectAuth
      .signInWithPopup(googleAuth)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.type === 'google') {
      GoogleLogin(e);
    } else if (e.type === 'facebook') {
      //FacebookLogin
    } else {
      login(email, password);
    }
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
      {error && error.code === 'auth/invalid-email' && <p>{error.message}</p>}
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {error && error.code === 'auth/wrong-password' && <p>{error.message}</p>}
      {!isPending && (
        <div className="login-btns">
          <button name="login" className="btn">
            Login
          </button>
          <button name="google" className="btn">
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
    </form>
  );
}
