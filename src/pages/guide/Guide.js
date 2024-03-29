import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LogoAnimation from '../../components/LogoAnimation';

//styles and icons
import styles from './Guide.module.css';
import logo from '../../components/logo.png';

export default function Guide() {
  return (
    <motion.div layout className={styles.container}>
      <motion.div layout className={styles.border}>
        <motion.div layout>
          <h1 className={styles.header}>The Official</h1>
          <h1 className={styles['header-logo']}>
            <img src={logo} className={styles['logo']} alt="StockUp Logo" />
            tockUp Guide.
          </h1>
          <p className={styles.instructions}>
            Follow the guide below to get started with StockUp today!
          </p>
        </motion.div>
        <div className={styles.card}>
          <h2 className={styles['card-heading']}>Step 1: Log Into StockUp</h2>
          <p className={styles.p}>
            Login to StockUp, try it out using a guest account, or sign up for a
            new account by clicking the button below.
          </p>
          <motion.div whileHover={{ scale: 1.1 }} role="link">
            <Link to="/login" className={styles.button}>
              Login
            </Link>
          </motion.div>
        </div>
        <div className={styles.card}>
          <h2 className={styles['card-heading']}>
            Step 2: Check on your favorite stocks
          </h2>
          <p className={styles.p}>
            Search for real-time prices of a single stock or create a watchlist
            to track a group of stocks.
          </p>
          <motion.div whileHover={{ scale: 1.1 }} role="link">
            <Link to="/stocks" className={styles.button}>
              Stocks
            </Link>
          </motion.div>
        </div>
        <div className={styles.card}>
          <h2 className={styles['card-heading']}>
            Step 3: Stay on top of your finances
          </h2>
          <p className={styles.p}>
            Use our transaction list feature to easily categorize and sort your
            finances.
          </p>
          <motion.div whileHover={{ scale: 1.1 }} role="link">
            <Link to="/transactions" className={styles.button}>
              Transactions
            </Link>
          </motion.div>
        </div>
      </motion.div>
      <LogoAnimation />
    </motion.div>
  );
}
