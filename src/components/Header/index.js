import styles from './index.less';
import { history } from 'umi';

const menus = [
  {
    url: '/',
    text: 'Home',
  },
  {
    url: '/history',
    text: 'History',
  },
];

const Header = (props) => {
  return (
    <ul className={styles['head-wrapper']}>
      {menus.map((item) => (
        <li
          key={item.url}
          className={`${styles['nav-item']} ${
            item.url === props.url && styles['nav-item-active']
          }`}
          onClick={() => history.push(item.url)}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
};

export default Header;
