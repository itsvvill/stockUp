import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

// styles
import styles from './Navbar.module.css';

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className={styles.navbar}>
      {!user && (
        <ul>
          <li className={styles.stocks}>StockUp</li>
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        </ul>
      )}
      {user && (
        <ul>
          <div>
            <li className={styles.stocks}>
              <Link to="/stocks">StockUp</Link>
            </li>
            <li className={styles.transactions}>
              <Link to="/">Transactions</Link>
            </li>
          </div>
          <div>
            <li>Hello, {user.displayName}!</li>
            <li>
              <button className={styles.logout} onClick={logout}>
                Logout
              </button>
            </li>
          </div>
        </ul>
      )}
    </nav>
  );
}
