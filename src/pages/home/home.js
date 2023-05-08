import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LogoAnimation from '../../components/LogoAnimation';

// styles and logo
import styles from './Home.module.css';
import logo from '../../components/logo.png';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h1 className={styles.header} data-nosnippet>
          Welcome to
        </h1>
        <h1 className={styles['header-logo']} data-nosnippet>
          <img
            src={logo}
            className={styles.logo}
            data-nosnippet
            alt="StockUp Logo"
          />
          tockUp!
        </h1>
        <h2 className={styles.slogan}>
          A financial website for smarter decision making.
        </h2>
        <ul className={styles.blurb}>
          <li data-nosnippet>
            Search for real-time stock prices and information.
          </li>
          <li data-nosnippet>
            Create a custom watchlist of the stocks you care about.
          </li>
          <li data-nosnippet>
            Stay on top of your budget with our transaction tracker.
          </li>
        </ul>
        <div className={styles['button-container']}>
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1 }}
            role="link"
            aria-label="Learn More"
          >
            <Link to="/guide" className={styles.button}>
              Learn More
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1 }}
            role="link"
            aria-label="Get Started"
          >
            <Link to="/login" className={styles.button}>
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>
      <LogoAnimation />
    </div>
  );
}
