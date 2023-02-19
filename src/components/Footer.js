// styles and icons
import styles from './Footer.module.css';
import { UilCopyright } from '@iconscout/react-unicons';
import { UilGithub } from '@iconscout/react-unicons';
import { UilExternalLinkAlt } from '@iconscout/react-unicons';
import logo from './logo.png';

export default function Footer() {
  return (
    <nav className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.stockup}>
          <div className={styles['links-container']}>
            <span>
              <img src={logo} className={styles.logo} alt="StockUp Logo" />
              tockUp
            </span>
            <div className={styles['links-div']}>
              <a
                href="https://www.github.com/itsvvill"
                className={styles['link']}
                target="blank"
              >
                <UilGithub size="23" />
              </a>
              <a
                href="https://www.linkedin.com/in/itsvvill"
                className={styles['link']}
                target="blank"
              >
                <UilExternalLinkAlt size="20" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <span className={styles['break-line']}></span>
        <UilCopyright size="18" className={styles.icon} /> StockUp 2023
      </div>
    </nav>
  );
}
