import { useState, useEffect, useMemo } from 'react';
import { Modal, message, Descriptions } from 'antd';
import useCrossChainModel from '@/models/useCrossChain';
import useHistoryModel from '@/models/useHistory';
import { copy } from '@/utils/utils';
import { CopyOutlined } from '@ant-design/icons';
import styles from './index.less';

const { Item } = Descriptions;

const InformationModal = (props) => {
  const { close, visible, id = undefined } = props;
  const { getInfoByKey } = useHistoryModel();
  const [info, setInfo] = useState({});
  const { getTokenLogo } = useCrossChainModel();

  useEffect(() => {
    if (id !== undefined) {
      let res = getInfoByKey(id);
      setInfo({ ...res });
    }
  }, [id]);
  console.log('info:', id, info);

  return (
    <Modal
      title="Select Asset"
      visible={visible}
      onCancel={close}
      closable={true}
      footer={null}
      wrapClassName={styles['modal-wrapper']}
    >
      <div className={styles['field']}>
        <div className={styles['label']}>{'Asset'}</div>
        <div className={styles['value']}>{info.asset}</div>
      </div>
      <div className={styles['field']}>
        <div className={styles['label']}>{'Chain Pair'}</div>
        <div className={styles['value']}>{`${info.from} - ${info.to}`}</div>
      </div>
      <div className={styles['field']}>
        <div className={styles['label']}>{'From'}</div>
        <div className={styles['value']}>{info.asset}</div>
      </div>
      <div className={styles['field']}>
        <div className={styles['label']}>{'To'}</div>
        <div className={styles['value']}>
          <span>{info.address}</span>
          <CopyOutlined
            className={styles['copy']}
            onClick={() => {
              copy(info.address);
            }}
          />
        </div>
      </div>
      <div className={styles['field']}>
        <div className={styles['label']}>{'Amount'}</div>
        <div className={styles['value']}>
          {info.amount} {info.asset}
        </div>
      </div>
      <div className={styles['field']}>
        <div className={styles['label']}>{'Fee'}</div>
        <div className={styles['value']}>
          {info.fee} {info.from}
        </div>
      </div>
      <div className={styles['field']}>
        <div className={styles['label']}>{'Status'}</div>
        <div className={styles['value']}>{'Success'}</div>
      </div>
      <div className={styles['field']}>
        <div className={styles['label']}>{'TxHash'}</div>
        <div className={styles['value']}>{info.txHash}</div>
      </div>
    </Modal>
  );
};

export default InformationModal;
