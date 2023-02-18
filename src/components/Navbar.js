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
        <ul className={styles.ul}>
          <li className={styles.stocks}>
            <img src={logo} className={styles.logo} alt="StockUp Logo" />
            tockUp
          </li>
          <li className={styles.login}>
            <Link to="/login">Login / Register</Link>
          </li>
        </ul>
      )}
      {user && (
        <ul className={styles.ul}>
          <div className={styles.div}>
            <li className={styles.stocks}>
              {location.pathname === '/' ? (
                <Link
                  to="/"
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
                <Link to="/" className={styles.stocks}>
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
              {location.pathname === '/transactions' ? (
                <Link
                  to="/transactions"
                  style={{
                    color: '#4CC49A',
                  }}
                >
                  Transactions
                </Link>
              ) : (
                <Link to="/transactions">Transactions</Link>
              )}
            </li>
          </div>
          <div className={styles.div}>
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
