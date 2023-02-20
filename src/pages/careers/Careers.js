import styles from './Careers.module.css';
import logo from '../../components/logo.png';
export default function Careers() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>
          Careers at{' '}
          <img src={logo} className={styles['logo']} alt="StockUp Logo" />
          tockUp
        </h1>
        <p>See our job opportunities below.</p>
      </div>
    </div>
  );
}
