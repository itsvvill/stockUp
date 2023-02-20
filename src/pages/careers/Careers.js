//styles and icons
import styles from './Careers.module.css';
import logo from '../../components/logo.png';
import { UilUserCircle } from '@iconscout/react-unicons';

export default function Careers() {
  //mock job info
  const opportunities = [
    {
      date: new Date().toDateString(),
      department: 'Engineering',
      title: 'Front-End Engineer',
      description: 'Delight our users with your designs...',
      available: false,
      recruiter: 'Steve Stylesheets',
      id: '1208734ASDFaf93121',
    },
    {
      date: new Date().toDateString(),
      department: 'Research',
      title: 'Data Scientist',
      description: 'Empower our services with data...',
      available: false,
      recruiter: 'Wonda Cuditbee',
      id: '12125FafSFCA121',
    },
    {
      date: new Date().toDateString(),
      department: 'Finance',
      title: 'Staff Accountant',
      description: 'Everyone needs some checks and balances...',
      available: false,
      recruiter: 'Penny Pinchers',
      id: '208208FASHW392',
    },
    {
      date: new Date().toDateString(),
      department: 'Engineering',
      title: 'FullStack Engineer',
      description: 'Create the next great finance product at scale...',
      available: false,
      recruiter: 'Al Gorithm',
      id: '08192312VBASD921',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1 className={styles.h1}>
          Careers at{' '}
          <img src={logo} className={styles['logo']} alt="StockUp Logo" />
          tockUp.
        </h1>
        <p>See our career opportunities below.</p>
      </div>
      <div className={styles['jobs-container']}>
        {opportunities.map((job) => (
          <div className={styles['job-card']} key={job.id}>
            <div className={styles['top-line']}>
              <p className={styles.date}>{job.date}</p>
              <p className={styles.department}>{job.department}</p>
            </div>
            <p className={styles.title}>{job.title}</p>
            <p className={styles.description}>{job.description}</p>
            <div>
              <div>
                <p className={styles.status}>
                  Position Status:{' '}
                  <span className={styles['status-span']}>
                    {job.available ? 'Available' : 'Unavailable'}
                  </span>
                </p>
              </div>
              <div className={styles['recruiter-container']}>
                Recruiting Contact: <UilUserCircle size="20" />
                <p className={styles.recruiter}>{job.recruiter}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
