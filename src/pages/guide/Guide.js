//styles and icons
import styles from './Guide.module.css';
import logo from '../../components/logo.png';

export default function Guide() {
  return (
    <div className={styles.container}>
      <div>
        <h1>
          The Official{' '}
          <img src={logo} className={styles['logo']} alt="StockUp Logo" />
          tockUp Guide.
        </h1>
        <p>Follow the guide below to get started with StockUp today!</p>
      </div>
    </div>
  );
}
