import { motion } from 'framer-motion';
import styles from './Logo.module.css';
import logo from './logo.png';

export default function LogoAnimation() {
  return (
    <>
      {/* Home page animation */}
      <div className={styles['logos-container']}>
        <motion.img
          layout
          src={logo}
          className={styles.logos}
          alt="StockUp Logo"
        />
        <motion.img
          layout
          src={logo}
          className={styles.logos}
          alt="StockUp Logo"
        />
        <motion.img
          layout
          src={logo}
          className={styles.logos}
          alt="StockUp Logo"
        />
        <motion.img
          layout
          src={logo}
          className={styles.logos}
          alt="StockUp Logo"
        />
        <motion.img
          layout
          src={logo}
          className={styles.logos}
          alt="StockUp Logo"
        />
        <motion.img
          layout
          src={logo}
          className={styles.logos}
          alt="StockUp Logo"
        />
        <motion.img
          layout
          src={logo}
          className={styles.logos}
          alt="StockUp Logo"
        />
        <motion.img
          layout
          src={logo}
          className={styles.logos}
          alt="StockUp Logo"
        />
        <motion.img
          layout
          src={logo}
          className={styles.logos}
          alt="StockUp Logo"
        />
        <motion.img
          layout
          src={logo}
          className={styles.logos}
          alt="StockUp Logo"
        />
      </div>
    </>
  );
}
