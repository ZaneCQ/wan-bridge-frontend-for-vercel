import { useState } from 'react';
import useHistoryModel from '@/models/useHistory';
import useCrossChainModel from '@/models/useCrossChain';
import { ArrowDownOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import InformationModal from 'components/InformationModal';
import styles from './index.less';

const History = () => {
  const { list, getList } = useHistoryModel();
  const { getTokenLogo, getChainLogo } = useCrossChainModel();
  const [showInfo, setShowInfo] = useState(false);
  const [key, setKey] = useState(undefined);
  const handleClick = (key) => {
    setShowInfo(true);
    setKey(key);
  };

  return (
    <>
      <div className={styles['confirm-wrapper']}>
        {list.length === 0 ? (
          <Empty description={'No Data'} />
        ) : (
          <table className={styles['table']}>
            <thead>
              <tr className={styles['table-head-tr']}>
                <th>Time</th>
                <th>Asset</th>
                <th>Amount</th>
                <th>Chain Pair</th>
                <th>To Address</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item) => {
                return (
                  <tr
                    key={item.key}
                    className={styles['table-tr']}
                    onClick={() => handleClick(item.key)}
                  >
                    <td className={styles['text-center']}>{item.time}</td>

                    <td className={styles['text-left']}>
                      <img
                        className={styles['token-logo']}
                        src={getTokenLogo(item.asset)}
                      />
                      <span style={{ color: 'white' /* 'rgb(255 243 91)' */ }}>
                        {item.asset}
                      </span>
                    </td>

                    <td className={styles['text-center']}>
                      {item.amount} {item.asset}
                    </td>

                    <td className={styles['text-center']}>
                      <div style={{ fontSize: '0.9em' }}>
                        <span>{item.from}</span>
                      </div>
                      <div style={{ lineHeight: '1em' }}>
                        <ArrowDownOutlined />
                      </div>
                      <div style={{ fontSize: '0.9em' }}>
                        <span>{item.to}</span>
                      </div>
                    </td>

                    <td
                      className={`${styles['text-left']} ${styles['word-wrap']}`}
                      style={{ fontSize: '0.9em' /* , width: '200px' */ }}
                    >
                      {item.address}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <InformationModal
        visible={showInfo}
        id={key}
        close={() => setShowInfo(false)}
      />
    </>
  );
};

export default History;
