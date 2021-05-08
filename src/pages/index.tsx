import Header from 'components/Header';
import styles from './index.less';

export default function IndexPage(props) {
  // console.log('props:', props);
  return (
    <div className={styles['main-container']}>
      <Header url={props.history.location.pathname} />
      {props.children}
    </div>
  );
}
