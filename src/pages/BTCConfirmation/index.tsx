import { useState, useEffect } from 'react';
import { Tooltip, Modal } from 'antd';
import { history } from 'umi';
import useFormDataModel from '@/models/useFormData';
import useBTCModel from '@/models/useBTC';
import {
  ArrowDownOutlined,
  CopyOutlined,
  QrcodeOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { copy } from '@/utils/utils';
import styles from './index.less';

const QRCode = require('qrcode.react');

const XRPConfirmation = () => {
  const { data, modify } = useFormDataModel();
  const { address } = useBTCModel();
  const [QRVisible, setQRVisible] = useState(false);
  const { amount, asset } = data;

  const onOK = () => {
    console.log('Confirm');
  };
  // console.log('data:', data);
  // console.log('{ address }:', { address });

  return (
    <div className={styles['confirm-wrapper']}>
      <div className={styles['title']}>BTC Confirmation</div>

      <div className={`${styles['amount-wrapper']} ${styles['wrapper']}`}>
        <div className={styles['label']}>Amount:</div>
        <div className={styles['value']}>
          {amount} {asset}
        </div>
      </div>

      <div className={`${styles['amount-wrapper']} ${styles['wrapper']}`}>
        <div className={styles['label']}></div>
        <div className={`${styles['value']} ${styles['down-arrow']}`}>
          <ArrowDownOutlined />
        </div>
      </div>

      <div
        className={`${styles['address-wrapper']} ${styles['wrapper']} ${styles['bkg']}`}
      >
        <div className={styles['label']}>One-time Address:</div>
        <div
          className={`${styles['value']} ${styles['left']}`}
          style={{
            paddingLeft: '12px',
            paddingRight: '36px',
          }}
        >
          {address}
          <Tooltip title={'Copy'}>
            <CopyOutlined
              className={styles['copy-icon']}
              onClick={() => copy(address)}
              style={{
                right: 22,
              }}
            />
          </Tooltip>
          <Tooltip title={'QR Code'}>
            <QrcodeOutlined
              className={styles['copy-icon']}
              onClick={() => setQRVisible(true)}
              style={{
                right: 3,
              }}
            />
          </Tooltip>
        </div>
      </div>

      <div className={styles['warning-text']}>
        <ExclamationCircleOutlined />
        <span>Do not send multiple deposits to the same One-time Address.</span>
      </div>

      <div className={styles['footer']}>
        <button className={styles['cancel']} onClick={() => history.push('/')}>
          Cancel
        </button>
        <button className={styles['ok']} onClick={onOK}>
          Confirm
        </button>
      </div>

      <Modal
        title={''}
        visible={QRVisible}
        onCancel={() => setQRVisible(false)}
        footer={null}
        centered={true}
        bodyStyle={{
          textAlign: 'center',
        }}
        width={360}
      >
        <QRCode value={address} size={240} />
      </Modal>
    </div>
  );
};

export default XRPConfirmation;
