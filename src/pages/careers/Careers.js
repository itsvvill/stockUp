import styles from './Careers.module.css';
import logo from '../../components/logo.png';
export default function Careers() {
  const opportunities = [
    {
      date: new Date().toDateString(),
      department: 'Engineering',
      title: 'Front-End Engineer',
      description: 'Join the StockUp team as a Front-End Engineer',
      available: false,
      recruiter: 'Steve Stylesheets',
      recruiterImage: '',
      id: '1208734ASDFaf93121',
    },
    {
      date: new Date().toDateString(),
      department: 'Research',
      title: 'Data Scientist',
      description: 'Join the StockUp team as a Data Scientest',
      available: false,
      recruiter: 'Wonda Cuditbee',
      recruiterImage: '',
      id: '12125FafSFCA121',
    },
    {
      date: new Date().toDateString(),
      department: 'Finance',
      title: 'Staff Accountant',
      description: 'Join the StockUp team as a Staff Accountant',
      available: false,
      recruiter: 'Penny Pinchers',
      recruiterImage: '',
      id: '208208FASHW392',
    },
    {
      date: new Date().toDateString(),
      department: 'Engineering',
      title: 'FullStack Engineer',
      description: 'Join the StockUp team as a Full Stack Engineer',
      available: false,
      recruiter: 'Al Gorithm',
      recruiterImage: '',
      id: '08192312VBASD921',
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>
          Careers at{' '}
          <img src={logo} className={styles['logo']} alt="StockUp Logo" />
          tockUp.
        </h1>
        <p>See our job opportunities below.</p>
      </div>
      <div className={styles['jobs-container']}>
        {opportunities.map((job) => (
          <div className={styles['job-card']} key={job.id}>
            <div>
              <p>{job.date}</p>
              <p>{job.department}</p>
            </div>
            <p>{job.title}</p>
            <p>{job.description}</p>
            <div>
              <div>
                <p>Position {job.available ? 'Available' : 'Unavailable'}</p>
              </div>
              <div>
                <image src={job.recruiterImage} alt="recruiter image" />
                <p>{job.recruiter}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
