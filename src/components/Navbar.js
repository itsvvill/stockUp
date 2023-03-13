import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Media from 'react-media';

// styles and logo
import styles from './Navbar.module.css';
import logo from './logo.png';
import { UilBars, UilMultiply, UilUserCircle } from '@iconscout/react-unicons';

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  let location = useLocation();
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    setToggleMenu(false);
  }, [location]);

  function toggleState() {
    setToggleMenu(!toggleMenu);
  }
  return (
    <>
      <Media
        queries={{
          small: '(max-width: 750px)',
          normal: '(min-width: 751px',
        }}
      >
        {(matches) => (
          <>
            {matches.normal && (
              <nav className={styles.navbar}>
                {!user && (
                  <ul className={styles.ul}>
                    <div className={styles.leftnav}>
                      {location.pathname === '/' ? (
                        <>
                          <li className={styles.stocks}>
                            <img src={logo} className={styles.logo} alt="S" />
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
                            <img
                              src={logo}
                              className={styles.logo}
                              alt="StockUp Logo"
                            />
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
                  </ul>
                )}
                {user && (
                  <ul className={styles.ul}>
                    <div className={styles.div}>
                      <div className={styles.leftnav}>
                        {location.pathname === '/' ? (
                          <li className={styles.stocks}>
                            <img
                              src={logo}
                              className={styles.logo}
                              alt="StockUp Logo"
                            />
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
                            <img
                              src={logo}
                              className={styles.logo}
                              alt="StockUp Logo"
                            />
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
                      <Link to="/user">
                        <li>
                          {user.photoURL ? (
                            <img
                              className={styles.profileimg}
                              src={user.photoURL}
                              referrerPolicy="no-referrer"
                              alt={`${user} profile`}
                            />
                          ) : (
                            <UilUserCircle className={styles.profileimg} />
                          )}
                        </li>
                      </Link>
                      <li className={styles.username}>
                        {user.displayName ? user.displayName : 'Guest'}
                      </li>
                      <li>
                        <button className={styles.logout} onClick={logout}>
                          Logout
                        </button>
                      </li>
                    </div>
                    {!toggleMenu && (
                      <UilBars className={styles.menu} color="1f8a58" />
                    )}
                  </ul>
                )}
              </nav>
            )}
            {/* nav for mobile */}
            {matches.small && !toggleMenu && (
              <nav className={styles.navbar}>
                <div className={styles.stocks}>
                  <img src={logo} className={styles.logo} alt="StockUp Logo" />
                  <Link
                    to="/"
                    style={{
                      color: '#4CC49A',
                    }}
                  >
                    tockUp
                  </Link>
                </div>
                <button onClick={toggleState} className={styles.menu}>
                  <UilBars color="#4cc49a" />
                </button>
              </nav>
            )}
            {matches.small && toggleMenu && (
              <>
                <nav className={styles['navbar-menu']}>
                  <div className={styles['navbar-row']}>
                    <div className={styles['stocks']}>
                      <img
                        src={logo}
                        className={styles.logo}
                        alt="StockUp Logo"
                      />
                      <Link
                        to="/"
                        style={{
                          color: '#4CC49A',
                        }}
                      >
                        tockUp
                      </Link>
                    </div>
                    <button
                      onClick={() => toggleState()}
                      className={styles.menu}
                    >
                      <UilMultiply color="#4cc49a" />
                    </button>
                  </div>
                  {!user && (
                    <div className={styles.div}>
                      <div>
                        <Link to="/">Home</Link>
                      </div>
                      <div>
                        <Link to="/guide">Guide</Link>
                      </div>
                      <div>
                        <Link className={styles.login} to="/login">
                          Login
                        </Link>
                      </div>
                    </div>
                  )}
                  {user && (
                    <div className={styles.div}>
                      <div>
                        <Link to="/">Home</Link>
                      </div>
                      <div>
                        <Link to="/guide">Guide</Link>
                      </div>
                      <div>
                        <Link to="/stocks">Stocks</Link>
                      </div>
                      <div>
                        <Link to="/transactions">Transactions</Link>
                      </div>
                      <Link to="/user" className={styles.user}>
                        {user.photoURL ? (
                          <img
                            className={styles.profileimg}
                            src={user.photoURL}
                            referrerPolicy="no-referrer"
                            alt={`${user} profile`}
                          />
                        ) : (
                          <UilUserCircle className={styles.profileimg} />
                        )}
                        <div className={styles.username}>
                          {user.displayName ? user.displayName : 'Guest'}
                        </div>
                      </Link>
                      <div>
                        <button
                          onClick={() => logout()}
                          className={styles.logout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </nav>
              </>
            )}
          </>
        )}
      </Media>
    </>
  );
}
