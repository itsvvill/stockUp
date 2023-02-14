import { Link, useLocation } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

// styles and logo
import styles from './Navbar.module.css';
import logo from './logo.png';

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  let location = useLocation();

  return (
    <nav className={styles.navbar}>
      {!user && (
        <ul>
          <li className={styles.stocks}>
            <img src={logo} className={styles.logo} alt="StockUp Logo" />
            tockUp
          </li>
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
              {location.pathname === '/stocks' ? (
                <Link
                  to="/stocks"
                  className={styles.stocks}
                  style={{
                    color: '#4CC49A',
                  }}
                >
                  <img
                    src={logo}
                    className={styles['logo-transactions']}
                    alt="StockUp Logo"
                  />
                  tockUp
                </Link>
              ) : (
                <Link to="/stocks" className={styles.stocks}>
                  {' '}
                  <img
                    src={logo}
                    className={styles['logo-transactions']}
                    alt="StockUp Logo"
                  />
                  tockUp
                </Link>
              )}
            </li>
            <li className={styles.transactions}>
              {location.pathname === '/' ? (
                <Link
                  to="/"
                  style={{
                    color: '#4CC49A',
                  }}
                >
                  Transactions
                </Link>
              ) : (
                <Link to="/">Transactions</Link>
              )}
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
