import { useState, useEffect } from 'react';
import { Input, Button, Tooltip, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { history } from 'umi';
import useFormDataModel from '@/models/useFormData';
import useCrossChainModel from '@/models/useCrossChain';
import arrow from 'images/swap-right.svg';
import styles from './index.less';

const copy = (text) => {
  try {
    navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
      if (result.state == 'granted' || result.state == 'prompt') {
        if ('writeText' in navigator.clipboard) {
          navigator.clipboard.writeText(text).then(
            (data) => {
              message.success('Copied');
            },
            (err) => {
              console.debug('Failed to copy :', err);
            },
          );
        } else {
          message.warn('Failed to copy');
        }
      } else {
        message.warn('Clipboard-write permission is denied by browser');
      }
    });
  } catch (err) {
    console.debug('Failed to copy :', err);
    message.warn('Failed to copy');
  }
};

const Confirmation = () => {
  const { data, modify } = useFormDataModel();
  const { getTokenLogo, getChainLogo } = useCrossChainModel();
  console.log('data:', data);
  if (data.step === 0) {
    history.push('/');
    return false;
  }

  return (
    <div className={styles['confirm-wrapper']}>
      <div className={styles['title']}>{data.asset} Transaction</div>
      <div className={styles['chain-pair-wrapper']}>
        <div className={styles['chain']}>
          <span>{data.from}</span>
        </div>
        <div className={styles['token-wrapper']}>
          <div className={styles['token']}>
            <img src={getTokenLogo(data.asset)} />
            {/* {data.asset} */}
          </div>
          <div className={styles['arrow']}>
            <object data={arrow} type="image/svg+xml"></object>
          </div>
        </div>
        <div className={styles['chain']}>
          <span>{data.to}</span>
        </div>
      </div>

      <div className={styles['label']}>From</div>
      <div className={styles['address-wrapper']}>
        <div>{data.fromAddress}</div>
        <CopyOutlined
          className={styles['copy-icon']}
          onClick={() => {
            copy(data.fromAddress);
          }}
        />
      </div>

      <div className={styles['label']}>To</div>
      <div className={styles['address-wrapper']}>
        <div>{data.toAddress}</div>
        <CopyOutlined
          className={styles['copy-icon']}
          onClick={() => {
            copy(data.toAddress);
          }}
        />
      </div>

      <div className={styles['number-wrapper']}>
        <div>
          <div className={styles['label']}>Amount</div>
          <div className={styles['number']}>
            <div>{data.amount}</div>
            <div>{data.asset}</div>
          </div>
        </div>

        <div>
          <div className={styles['label']}>Fee</div>
          <div className={styles['number']}>
            <div>{data.fee}</div>
            <div>{data.asset}</div>
          </div>
        </div>
      </div>

      <div className={styles['footer']}>
        <button className={styles['cancel']}>Cancel</button>
        <button className={styles['ok']}>Confirm</button>
      </div>
    </div>
  );
};
Confirmation;
export default Confirmation;
