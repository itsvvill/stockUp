import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// styles and icons
import styles from './NotFound.module.css';
import { UilExclamationCircle } from '@iconscout/react-unicons';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.warning}>
        <h1>
          <UilExclamationCircle className={styles.oops} size="25" color="red" />
          Sorry, page not found.
          <UilExclamationCircle className={styles.oops} size="25" color="red" />
        </h1>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link to="/" className={styles.click}>
            Go back
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
