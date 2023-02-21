import { Link } from 'react-router-dom';

import styles from './Home.module.css';
import logo from '../../components/logo.png';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h1 className={styles.header}>
          Welcome to{' '}
          <span>
            <img src={logo} className={styles['logo']} alt="StockUp Logo" />
            tockUp!
          </span>
        </h1>
        <h2>A financial website for smarter decision making.</h2>
        <ul className={styles.blurb}>
          <li>Search for real-time stock prices and information.</li>
          <li>Create a custom watchlist of the stocks you care about.</li>
          <li>Stay on top of your budget with our transaction tracker.</li>
        </ul>
        <div className={styles['button-container']}>
          <Link to="/guide" className={styles.button}>
            Learn More
          </Link>
          <Link to="/login" className={styles.button}>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
