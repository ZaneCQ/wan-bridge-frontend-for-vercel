// import wallet from 'components/Wallet';
import styles from './index.less';

export default function IndexPage(props) {
  return <div className={styles['main-container']}>{props.children}</div>;
}
