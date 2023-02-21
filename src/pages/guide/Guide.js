import { Link } from 'react-router-dom';

//styles and icons
import styles from './Guide.module.css';
import logo from '../../components/logo.png';

export default function Guide() {
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.header}>
          The Official{' '}
          <img src={logo} className={styles['logo']} alt="StockUp Logo" />
          tockUp Guide.
        </h1>
        <p>Follow the guide below to get started with StockUp today!</p>
      </div>
      <div>
        <h2>Step 1: Log Into StockUp</h2>
        <p>
          Log in to your StockUp account. If you don't have an account, you can
          create one by clicking the button below.
        </p>
        <Link to="/login" className={styles.button}>
          Login
        </Link>
      </div>
    </div>
  );
}
