import styles from './index.less';

const LoadingIcon = (props) => {
  const { icon } = props;
  return (
    <div className={styles['wrapper']}>
      <img className={styles['item']} src={icon} />
    </div>
  );
};
export default LoadingIcon;
