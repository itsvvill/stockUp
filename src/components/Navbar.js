import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Media from 'react-media';
import { motion } from 'framer-motion';

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
              <motion.nav className={styles.navbar} layout>
                {!user && (
                  <ul className={styles.ul}>
                    <div className={styles.leftnav}>
                      {location.pathname === '/' ? (
                        <>
                          <li>
                            <Link
                              to="/"
                              className={styles.stocks}
                              style={{
                                color: '#4CC49A',
                                cursor: 'default',
                              }}
                            >
                              <img
                                src={logo}
                                className={styles.logo}
                                alt="S"
                                style={{
                                  cursor: 'default',
                                }}
                              />
                              tockUp
                            </Link>
                          </li>
                          <Link
                            to="/"
                            className={styles.links}
                            style={{
                              color: '#4CC49A',
                              cursor: 'default',
                            }}
                          >
                            Home
                          </Link>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link className={styles.stocks} to="/">
                              <img
                                src={logo}
                                className={styles.logo}
                                alt="StockUp Logo"
                              />
                              tockUp
                            </Link>
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
                            cursor: 'default',
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
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <Link to="/login" className={styles.login}>
                        Login
                      </Link>
                    </motion.div>
                  </ul>
                )}
                {user && (
                  <ul className={styles.ul}>
                    <div className={styles.div}>
                      <div className={styles.leftnav}>
                        {location.pathname === '/' ? (
                          <li>
                            <Link
                              to="/"
                              className={styles.stocks}
                              style={{
                                color: '#4CC49A',
                                cursor: 'default',
                              }}
                            >
                              <img
                                src={logo}
                                className={styles.logo}
                                style={{ cursor: 'default' }}
                                alt="StockUp Logo"
                              />
                              tockUp
                            </Link>
                          </li>
                        ) : (
                          <li>
                            <Link className={styles.stocks} to="/">
                              <img
                                src={logo}
                                className={styles.logo}
                                alt="StockUp Logo"
                              />
                              tockUp
                            </Link>
                          </li>
                        )}
                        <li className={styles.links}>
                          {location.pathname === '/stocks' ? (
                            <Link
                              to="/stocks"
                              className={styles.links}
                              style={{
                                color: '#4CC49A',
                                cursor: 'default',
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
                                cursor: 'default',
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
                      {location.pathname === '/user' ? (
                        <li className={styles.user}>
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
                        </li>
                      ) : (
                        <Link to="/user">
                          <li className={styles['user-active']}>
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
                          </li>
                        </Link>
                      )}
                      <li>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          className={styles.logout}
                          onClick={logout}
                        >
                          Logout
                        </motion.button>
                      </li>
                    </div>
                    {!toggleMenu && (
                      <UilBars className={styles.menu} color="1f8a58" />
                    )}
                  </ul>
                )}
              </motion.nav>
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
                      <motion.div
                        whileHover={{
                          backgroundColor: '#4cc49a',
                          transition: { duration: 0.6 },
                        }}
                        className={styles['link-container']}
                      >
                        <Link to="/">Home</Link>
                      </motion.div>
                      <motion.div
                        whileHover={{
                          backgroundColor: '#4cc49a',
                          transition: { duration: 0.6 },
                        }}
                        className={styles['link-container']}
                      >
                        <Link to="/guide">Guide</Link>
                      </motion.div>
                      <motion.div
                        whileHover={{
                          scale: 1.2,
                        }}
                        className={styles['link-container']}
                      >
                        <Link className={styles.login} to="/login">
                          Login
                        </Link>
                      </motion.div>
                    </div>
                  )}
                  {user && (
                    <div className={styles.div}>
                      <motion.div
                        whileHover={{
                          backgroundColor: '#4cc49a',
                          transition: { duration: 0.6 },
                        }}
                        className={styles['link-container']}
                      >
                        <Link to="/">Home</Link>
                      </motion.div>
                      <motion.div
                        whileHover={{
                          backgroundColor: '#4cc49a',
                          transition: { duration: 0.6 },
                        }}
                        className={styles['link-container']}
                      >
                        <Link to="/guide">Guide</Link>
                      </motion.div>
                      <motion.div
                        whileHover={{
                          backgroundColor: '#4cc49a',
                          transition: { duration: 0.6 },
                        }}
                        className={styles['link-container']}
                      >
                        <Link to="/stocks">Stocks</Link>
                      </motion.div>
                      <motion.div
                        whileHover={{
                          backgroundColor: '#4cc49a',
                          transition: { duration: 0.6 },
                        }}
                        className={styles['link-container']}
                      >
                        <Link to="/transactions">Transactions</Link>
                      </motion.div>
                      <motion.div
                        whileHover={{
                          backgroundColor: '#4cc49a',
                          transition: { duration: 0.6 },
                        }}
                        className={styles['link-container']}
                      >
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
                      </motion.div>
                      <div>
                        <motion.button
                          whileHover={{ scale: 1.2, transition: 0.6 }}
                          onClick={() => logout()}
                          className={styles.logout}
                        >
                          Logout
                        </motion.button>
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
