import { useState, useEffect } from 'react';
import { Steps } from 'antd';
import useFormDataModel from '@/models/useFormData';
import { ArrowDownOutlined, CopyOutlined } from '@ant-design/icons';
import { copy } from '@/utils/utils';
import styles from './index.less';

const { Step } = Steps;

const XRPConfirmation = () => {
  const { data, modify } = useFormDataModel();
  const [x, setX] = useState(false);
  const addr = '0x00000000000000000000000000000';
  const tag = 120;
  console.log('data:', data);
  const { amount, asset } = data;

  return (
    <div className={styles['confirm-wrapper']}>
      <Steps current={2} className={styles['step']}>
        <Step title="Input" />
        <Step title="Confirm" />
        <Step title={asset} />
        <Step title="Finished" />
      </Steps>

      <div className={styles['title']}>XRP Confirmation</div>
      {!x ? (
        <>
          <div className={styles['amount-wrapper']}>
            <div className={styles['label']}>Amount:</div>
            <div className={styles['value']}>
              {amount} {asset}
            </div>
          </div>

          <div className={styles['amount-wrapper']}>
            <div className={styles['label']}></div>
            <div className={`${styles['value']} ${styles['down-arrow']}`}>
              <ArrowDownOutlined />
            </div>
          </div>

          <div className={styles['address-wrapper']}>
            <div className={styles['label']}>XRP Address:</div>
            <div className={`${styles['value']} ${styles['left']}`}>
              {addr}
              <CopyOutlined
                className={styles['copy-icon']}
                onClick={() => copy(addr)}
              />
            </div>
          </div>
        </>
      ) : (
        <div>X Address</div>
      )}

      <div
        className={styles['switch']}
        onClick={() => {
          setX(!x);
        }}
      >
        {x ? 'Switch to use XRP Address' : 'Switch to use X Address'}
      </div>

      <div className={styles['tag-wrapper']}>
        <div className={styles['label']}>Destination Tag:</div>
        <div className={styles['value']}>{tag}</div>
      </div>
    </div>
  );
};

export default XRPConfirmation;
