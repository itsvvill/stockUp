import { Link, useLocation } from 'react-router-dom';

// styles and icons
import styles from './Footer.module.css';
import {
  UilCopyright,
  UilExternalLinkAlt,
  UilGithub,
} from '@iconscout/react-unicons';
import logo from './logo.png';

export default function Footer() {
  let location = useLocation();
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
          {location.pathname === '/guide' ? (
            <Link
              to="/guide"
              className={styles['link']}
              style={{
                color: '#4CC49A',
                cursor: 'default',
                textShadow: '1px 1px white',
              }}
              role="link"
            >
              Guide
            </Link>
          ) : (
            <Link to="/guide" className={styles['link']} role="link">
              Guide
            </Link>
          )}
          {location.pathname === '/careers' ? (
            <Link
              to="/careers"
              className={styles['link']}
              style={{
                color: '#4CC49A',
                cursor: 'default',
                textShadow: '1px 1px white',
              }}
              role="link"
            >
              Careers
            </Link>
          ) : (
            <Link to="/careers" className={styles['link']} role="link">
              Careers
            </Link>
          )}
        </div>
        <div className={styles['footer-links']}>
          <p className={styles['footer-title']}>STACK</p>
          <a
            href="https://react.dev/learn"
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
            LinkedIn
          </a>
        </div>
      </div>
      <div className={styles.copyright}>
        <span className={styles['break-line']}></span>
        <UilCopyright size="16" className={styles.icon} /> StockUp 2024 |{' '}
        {location.pathname === '/privacy' ? (
          <Link
            className={styles.privacy}
            style={{
              color: '#4CC49A',
              cursor: 'default',
              textShadow: '1px 1px white',
            }}
            to="/privacy"
            role="link"
          >
            Privacy Policy
          </Link>
        ) : (
          <Link className={styles.privacy} to="/privacy" role="link">
            Privacy Policy
          </Link>
        )}
      </div>
    </nav>
  );
}
