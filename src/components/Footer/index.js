import chemistry from 'images/chemistry.svg';
import styles from './index.less';

function Footer(props) {
  return (
    <div className={styles['footer-container']}>
      <p>
        Powered by <img className={styles['logo']} src={chemistry} /> WanLabs
        Ltd
      </p>
    </div>
  );
}

export default Footer;
