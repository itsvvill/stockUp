import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

// styles
import styles from './Navbar.module.css';

export default function Navbar() {
  const { logout } = useLogout();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>myMoney</li>
        <li>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
}
