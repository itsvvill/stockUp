import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Media from 'react-media';
import { motion } from 'framer-motion';
import { storage } from '../firebase/config';

// styles and logo
import styles from './Navbar.module.css';
import logo from './logo.png';
import Avatar from 'boring-avatars';
import { UilBars, UilMultiply } from '@iconscout/react-unicons';

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  let location = useLocation();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [profileURL, setProfileURL] = useState(null);

  useEffect(() => {
    setToggleMenu(false);
    (async () => {
      if (user && !user?.isAnonymous) {
        const storageRef = await storage.ref(user?.uid + '/profilePicture/');
        const files = await storageRef.list();
        const url = await storage.ref(files.items[0].fullPath).getDownloadURL();
        if (url !== null || url !== undefined || url !== '') {
          setProfileURL((prevState) => url);
        }
      }
    })();
  }, [location, user?.uid]);

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
                  <ul className={styles.ul} role="navigation">
                    <div className={styles.leftnav}>
                      {location.pathname === '/' ? (
                        <>
                          <li>
                            <Link
                              to="/"
                              className={styles.stocks}
                              tabIndex={0}
                              style={{
                                color: '#4CC49A',
                                cursor: 'default',
                                textShadow: '1px 1px white',
                              }}
                              role="link"
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
                              textShadow: '1px 1px white',
                            }}
                            role="link"
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
                          <Link to="/" className={styles.links} role="link">
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
                            textShadow: '1px 1px white',
                          }}
                          className={styles.links}
                          role="link"
                        >
                          Guide
                        </Link>
                      ) : (
                        <Link to="/guide" className={styles.links} role="link">
                          Guide
                        </Link>
                      )}
                    </div>
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <Link to="/login" className={styles.login} role="link">
                        Login
                      </Link>
                    </motion.div>
                  </ul>
                )}
                {user && (
                  <ul className={styles.ul} role="navigation">
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
                                textShadow: '1px 1px white',
                              }}
                              role="link"
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
                            <Link className={styles.stocks} to="/" role="link">
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
                                textShadow: '1px 1px white',
                              }}
                              role="link"
                            >
                              Stocks
                            </Link>
                          ) : (
                            <Link
                              to="/stocks"
                              className={styles.links}
                              role="link"
                            >
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
                                textShadow: '1px 1px white',
                              }}
                              role="link"
                            >
                              Transactions
                            </Link>
                          ) : (
                            <Link to="/transactions" role="link">
                              Transactions
                            </Link>
                          )}
                        </li>
                      </div>
                    </div>
                    <div className={styles.div}>
                      {location.pathname === '/user' ? (
                        <li className={styles.user}>
                          {profileURL !== null ? (
                            <img
                              className={styles.profileimg}
                              src={profileURL}
                              referrerPolicy="no-referrer"
                              alt={`${user} profile`}
                            />
                          ) : user.photoURL ? (
                            <img
                              className={styles.profileimg}
                              src={user.photoURL}
                              referrerPolicy="no-referrer"
                              alt={`${user} profile`}
                            />
                          ) : (
                            <Avatar
                              size="35"
                              variant="beam"
                              name="Guest"
                              className={styles.profileimg}
                              colors={['#1f8a58', '#ebeaea', '#4cc49a']}
                            />
                          )}
                          <div className={styles.username}>
                            {user.displayName ? user.displayName : 'Guest'}
                          </div>
                        </li>
                      ) : (
                        <Link to="/user" role="link">
                          <li className={styles['user-active']}>
                            {profileURL !== null ? (
                              <img
                                className={styles.profileimg}
                                src={profileURL}
                                referrerPolicy="no-referrer"
                                alt={`${user} profile`}
                              />
                            ) : user.photoURL ? (
                              <img
                                className={styles.profileimg}
                                src={user.photoURL}
                                referrerPolicy="no-referrer"
                                alt={`${user} profile`}
                              />
                            ) : (
                              <Avatar
                                size="35"
                                variant="beam"
                                name="Guest"
                                className={styles.profileimg}
                                colors={['#1f8a58', '#ebeaea', '#4cc49a']}
                              />
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
                          role="button"
                        >
                          Logout
                        </motion.button>
                      </li>
                    </div>
                    {!toggleMenu && (
                      <UilBars
                        className={styles.menu}
                        color="1f8a58"
                        role="button"
                        aria-label="toggle menu"
                      />
                    )}
                  </ul>
                )}
              </motion.nav>
            )}
            {/* nav for mobile */}
            {matches.small && !toggleMenu && (
              <nav className={styles.navbar} role="navigation">
                {location.pathname === '/' ? (
                  <div>
                    <Link
                      className={styles['stocks']}
                      to="/"
                      style={{
                        color: '#4CC49A',
                        cursor: 'default',
                      }}
                      role="link"
                    >
                      <img
                        src={logo}
                        className={styles.logo}
                        style={{ cursor: 'default' }}
                        alt="StockUp Logo"
                      />
                      tockUp
                    </Link>
                  </div>
                ) : (
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
                      role="link"
                    >
                      tockUp
                    </Link>
                  </div>
                )}
                <button
                  onClick={toggleState}
                  className={styles.menu}
                  aria-label="toggle menu"
                >
                  <UilBars color="#4cc49a" />
                </button>
              </nav>
            )}
            {matches.small && toggleMenu && (
              <>
                <nav className={styles['navbar-menu']} role="navigation">
                  <div className={styles['navbar-row']}>
                    {location.pathname === '/' ? (
                      <div>
                        <Link
                          className={styles['stocks']}
                          to="/"
                          style={{
                            color: '#4CC49A',
                            cursor: 'default',
                          }}
                          role="link"
                        >
                          <img
                            src={logo}
                            className={styles.logo}
                            style={{ cursor: 'default' }}
                            alt="StockUp Logo"
                          />
                          tockUp
                        </Link>
                      </div>
                    ) : (
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
                          role="link"
                        >
                          tockUp
                        </Link>
                      </div>
                    )}
                    <button
                      onClick={() => toggleState()}
                      className={styles.menu}
                    >
                      <UilMultiply color="#4cc49a" />
                    </button>
                  </div>
                  {!user && (
                    <div className={styles.div}>
                      {location.pathname === '/' ? (
                        <div
                          className={styles['link-container']}
                          style={{ color: '#4CC49A' }}
                        >
                          Home
                        </div>
                      ) : (
                        <motion.div
                          whileHover={{
                            backgroundColor: '#4cc49a',
                            transition: { duration: 0.6 },
                          }}
                          className={styles['link-container']}
                        >
                          <Link to="/" role="link">
                            Home
                          </Link>
                        </motion.div>
                      )}
                      {location.pathname === '/guide' ? (
                        <div
                          className={styles['link-container']}
                          style={{ color: '#4CC49A' }}
                        >
                          Guide
                        </div>
                      ) : (
                        <motion.div
                          whileHover={{
                            backgroundColor: '#4cc49a',
                            transition: { duration: 0.6 },
                          }}
                          className={styles['link-container']}
                        >
                          <Link to="/guide" role="link">
                            Guide
                          </Link>
                        </motion.div>
                      )}

                      <motion.div
                        whileHover={{
                          scale: 1.2,
                        }}
                        className={styles['link-container']}
                      >
                        <Link className={styles.login} to="/login" role="link">
                          Login
                        </Link>
                      </motion.div>
                    </div>
                  )}
                  {user && (
                    <div className={styles.div}>
                      {location.pathname === '/' ? (
                        <div
                          className={styles['link-container']}
                          style={{ color: '#4CC49A' }}
                        >
                          Home
                        </div>
                      ) : (
                        <motion.div
                          whileHover={{
                            backgroundColor: '#4cc49a',
                            transition: { duration: 0.6 },
                          }}
                          className={styles['link-container']}
                        >
                          <Link to="/" role="link">
                            Home
                          </Link>
                        </motion.div>
                      )}
                      {location.pathname === '/guide' ? (
                        <div
                          className={styles['link-container']}
                          style={{ color: '#4CC49A' }}
                        >
                          Guide
                        </div>
                      ) : (
                        <motion.div
                          whileHover={{
                            backgroundColor: '#4cc49a',
                            transition: { duration: 0.6 },
                          }}
                          className={styles['link-container']}
                        >
                          <Link to="/guide" role="link">
                            Guide
                          </Link>
                        </motion.div>
                      )}
                      {location.pathname === '/stocks' ? (
                        <div
                          className={styles['link-container']}
                          style={{ color: '#4CC49A' }}
                        >
                          Stocks
                        </div>
                      ) : (
                        <motion.div
                          whileHover={{
                            backgroundColor: '#4cc49a',
                            transition: { duration: 0.6 },
                          }}
                          className={styles['link-container']}
                        >
                          <Link to="/stocks" role="link">
                            Stocks
                          </Link>
                        </motion.div>
                      )}
                      {location.pathname === '/transactions' ? (
                        <div
                          className={styles['link-container']}
                          style={{ color: '#4CC49A' }}
                        >
                          Transactions
                        </div>
                      ) : (
                        <motion.div
                          whileHover={{
                            backgroundColor: '#4cc49a',
                            transition: { duration: 0.6 },
                          }}
                          className={styles['link-container']}
                        >
                          <Link to="/transactions" role="link">
                            Transactions
                          </Link>
                        </motion.div>
                      )}
                      {location.pathname === '/user' ? (
                        <div className={styles['link-container']}>
                          <div
                            className={styles.user}
                            style={{ color: '#4CC49A' }}
                          >
                            {profileURL !== null ? (
                              <img
                                className={styles.profileimg}
                                src={profileURL}
                                referrerPolicy="no-referrer"
                                alt={`${user} profile`}
                              />
                            ) : user.photoURL ? (
                              <img
                                className={styles.profileimg}
                                src={user.photoURL}
                                referrerPolicy="no-referrer"
                                alt={`${user} profile`}
                              />
                            ) : (
                              <Avatar
                                size="35"
                                variant="beam"
                                name="Guest"
                                className={styles.profileimg}
                                colors={['#1f8a58', '#ebeaea', '#4cc49a']}
                              />
                            )}
                            <div className={styles.username}>
                              {user.displayName ? user.displayName : 'Guest'}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <motion.div
                          whileHover={{
                            backgroundColor: '#4cc49a',
                            transition: { duration: 0.6 },
                          }}
                          className={styles['link-container']}
                        >
                          <Link
                            to="/user"
                            className={styles.user}
                            style={{ cursor: 'pointer' }}
                            role="link"
                          >
                            {user.photoURL ? (
                              <img
                                className={styles.profileimg}
                                src={user.photoURL}
                                referrerPolicy="no-referrer"
                                alt={`${user} profile`}
                              />
                            ) : (
                              <Avatar
                                size="35"
                                variant="beam"
                                name="Guest"
                                className={styles.profileimg}
                                colors={['#1f8a58', '#ebeaea', '#4cc49a']}
                              />
                            )}
                            <div className={styles.username}>
                              {user.displayName ? user.displayName : 'Guest'}
                            </div>
                          </Link>
                        </motion.div>
                      )}
                      <div>
                        <motion.button
                          whileHover={{ scale: 1.2, transition: 0.6 }}
                          onClick={() => logout()}
                          className={styles.logout}
                          role="button"
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
