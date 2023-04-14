import { Link } from 'react-router-dom';

// styles and icons
import styles from './Footer.module.css';
import { UilCopyright } from '@iconscout/react-unicons';
import { UilGithub } from '@iconscout/react-unicons';
import { UilExternalLinkAlt } from '@iconscout/react-unicons';
import logo from './logo.png';

export default function Footer() {
  return (
    <nav className={styles.footer} role="navigation">
      <div className={styles.container}>
        <div className={styles.stockup}>
          <div className={styles['links-container']}>
            <span>
              <img src={logo} className={styles.logo} alt="S" />
              tockUp
            </span>
            <p className={styles.motto}>
              A financial website for smarter decision making.
            </p>
            <div className={styles['links-div']}>
              <a
                href="https://www.github.com/itsvvill"
                className={styles['link']}
                target="blank"
                alt="Will Eason's Github"
                aria-label="Visit Will Eason's Github"
              >
                <UilGithub size="23" />
              </a>
              <a
                href="https://www.linkedin.com/in/itsvvill"
                className={styles['link']}
                target="blank"
                alt="Will Eason's LinkedIn"
                aria-label="Visit Will Eason's LinkedIn"
              >
                <UilExternalLinkAlt size="20" />
              </a>
            </div>
          </div>
        </div>
        <div className={styles['footer-links']}>
          <p className={styles['footer-title']}>INFO</p>
          <Link to="/guide" className={styles['link']} role="link">
            Guide
          </Link>
          <Link to="/careers" className={styles['link']} role="link">
            Careers
          </Link>
        </div>
        <div className={styles['footer-links']}>
          <p className={styles['footer-title']}>STACK</p>
          <a
            href="https://reactjs.org/docs/getting-started.html"
            className={styles['link']}
            target="blank"
            alt="React Documentation"
            aria-label="Learn more about React"
          >
            ReactJS
          </a>
          <a
            href="https://firebase.google.com/docs"
            className={styles['link']}
            target="blank"
            alt="Firebase Documentation"
            aria-label="Learn more about Firebase"
          >
            Firebase
          </a>
        </div>
        <div className={styles['footer-links']}>
          <p className={styles['footer-title']}>PORTFOLIO</p>
          <a
            href="https://www.github.com/itsvvill"
            className={styles['link']}
            target="blank"
            alt="Will Eason's Github"
            aria-label="Visit Will Eason's Github"
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/itsvvill"
            className={styles['link']}
            target="blank"
            alt="Will Eason's LinkedIn"
            aria-label="Visit Will Eason's LinkedIn"
          >
            Personal Site
          </a>
        </div>
      </div>
      <div className={styles.copyright}>
        <span className={styles['break-line']}></span>
        <UilCopyright size="18" className={styles.icon} /> StockUp 2023 |{' '}
        <Link className={styles.privacy} to="/privacy" role="link">
          Privacy Policy
        </Link>
      </div>
    </nav>
  );
}
