// styles and icons
import styles from './Footer.module.css';
import { UilCopyright } from '@iconscout/react-unicons';
import logo from './logo.png';

export default function Footer() {
  return (
    <nav className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.stockup}>
          <img src={logo} className={styles.logo} alt="StockUp Logo" />
          tockUp
        </div>
      </div>
      <div className={styles.copyright}>
        <UilCopyright size="18" className={styles.icon} /> StockUp 2023
      </div>
    </nav>
  );
}
