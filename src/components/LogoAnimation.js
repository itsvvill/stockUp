import { motion } from 'framer-motion';
import styles from './Logo.module.css';
import logo from './logo.png';

export default function LogoAnimation() {
  return (
    <>
      {/* Home page animation */}
      <div className={styles['logos-container']}>
        {[...Array(9)].map((n, i) => (
          <motion.img
            layout
            src={logo}
            className={styles.logos}
            key={i}
            alt="StockUp Logo"
          />
        ))}
      </div>
    </>
  );
}
