// import wallet from 'components/Wallet';
import styles from './index.less';

export default function IndexPage(props) {
  console.log('Render Index page.');

  return <div className={styles['main-container']}>{props.children}</div>;
}
