import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

// styles and logo
import styles from './Navbar.module.css';
import logo from './logo.png';
import { UilBars } from '@iconscout/react-unicons';
import { UilMultiply } from '@iconscout/react-unicons';

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  let location = useLocation();
  const [toggleMenu, setToggleMenu] = useState(false);

  console.log(windowSize.current[0] <= 750);
  return (
    <nav className={styles.navbar}>
      {!user && (
        <ul className={styles.ul}>
          <div className={styles.leftnav}>
            {location.pathname === '/' ? (
              <>
                <li className={styles.stocks}>
                  <img src={logo} className={styles.logo} alt="StockUp Logo" />
                  <Link
                    to="/"
                    style={{
                      color: '#4CC49A',
                    }}
                  >
                    tockUp
                  </Link>
                </li>
                <Link
                  to="/"
                  className={styles.links}
                  style={{
                    color: '#4CC49A',
                  }}
                >
                  Home
                </Link>
              </>
            ) : (
              <>
                <li className={styles.stocks}>
                  <img src={logo} className={styles.logo} alt="StockUp Logo" />
                  <Link to="/">tockUp</Link>
                </li>
                <Link to="/" className={styles.links}>
                  Home
                </Link>
              </>
            )}
            {location.pathname === '/guide' ? (
              <Link
                to="/guide"
                style={{
                  color: '#4CC49A',
                }}
                className={styles.links}
              >
                Guide
              </Link>
            ) : (
              <Link to="/guide" className={styles.links}>
                Guide
              </Link>
            )}
          </div>
          <Link className={styles.login} to="/login">
            Login
          </Link>
          {/* nav for mobile */}
          {!toggleMenu && (
            <button
              onClick={() => setToggleMenu(!toggleMenu)}
              className={styles.menu}
            >
              <UilBars color="#4cc49a" />
            </button>
          )}
          {toggleMenu && (
            <button
              onClick={() => setToggleMenu(!toggleMenu)}
              className={styles.menu}
            >
              <UilMultiply color="#4cc49a" />
            </button>
          )}
        </ul>
      )}
      {user && (
        <ul className={styles.ul}>
          <div className={styles.div}>
            <div className={styles.leftnav}>
              {location.pathname === '/' ? (
                <li className={styles.stocks}>
                  <img src={logo} className={styles.logo} alt="StockUp Logo" />
                  <Link
                    to="/"
                    style={{
                      color: '#4CC49A',
                    }}
                  >
                    tockUp
                  </Link>
                </li>
              ) : (
                <li className={styles.stocks}>
                  <img src={logo} className={styles.logo} alt="StockUp Logo" />
                  <Link to="/">tockUp</Link>
                </li>
              )}
              <li className={styles.links}>
                {location.pathname === '/stocks' ? (
                  <Link
                    to="/stocks"
                    className={styles.links}
                    style={{
                      color: '#4CC49A',
                    }}
                  >
                    Stocks
                  </Link>
                ) : (
                  <Link to="/stocks" className={styles.links}>
                    Stocks
                  </Link>
                )}
              </li>
              <li className={styles.links}>
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
          </div>
          <div className={styles.div}>
            <li className={styles.username}>
              Hello, {user.displayName ? user.displayName : 'Guest'}!
            </li>
            <li>
              <button className={styles.logout} onClick={logout}>
                Logout
              </button>
            </li>
          </div>
          {!toggleMenu && <UilBars className={styles.menu} color="1f8a58" />}
        </ul>
      )}
    </nav>
  );
}
