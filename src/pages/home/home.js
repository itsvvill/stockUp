import styles from './Home.module.css';
import logo from '../../components/logo.png';

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
        <h1>
          Welcome to{' '}
          <img src={logo} className={styles['logo']} alt="StockUp Logo" />
          tockUp!
        </h1>
        <p>A financial website for smarter decision making.</p>
      </div>
    </div>
  );
}
