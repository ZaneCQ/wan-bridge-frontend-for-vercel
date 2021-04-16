import { useState, useEffect } from 'react';
import { Form, Input, Button, Tooltip, Modal, message } from 'antd';
import { useRequest } from 'ahooks';
import {
  RightOutlined,
  SwapOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import wan from 'images/wan.png';
import styles from './index.less';
import TokenModal from 'components/TokenModal';

const { Item } = Form;

export default function IndexPage() {
  const [asset, setAsset] = useState('USDC');
  const [toDisabled, setToDisabled] = useState(true);
  const [amount, setAmount] = useState('');
  const [assetModalVisible, setAssetModalVisible] = useState(true);
  const amountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className={styles['main-container']}>
      <div className={styles['form-wrapper']}>
        <div className={styles['title']}>WAN Bridge</div>

        <div className={styles['fake-input-label']}>Asset</div>
        <div
          className={styles['fake-input-panel']}
          onClick={() => {
            setAssetModalVisible(true);
          }}
        >
          <div className={styles['fake-input-icon']}>
            <img src={wan} />
          </div>
          <div className={styles['fake-input-text']}>{asset}</div>
          <RightOutlined style={{ color: '#ffffff' }} />
        </div>
        <div className={styles['chain-pair-wrapper']}>
          <div className={styles['chain-item']}>
            <div className={styles['chain-label']}>From</div>
            <div className={styles['chain-box']}>
              <img src={wan} />
              <p>{'From'}</p>
              <p>{'Network'}</p>
              <div className={styles['chain-box-arrow']}>
                <RightOutlined style={{ color: '#ffffff', fontSize: '16px' }} />
              </div>
            </div>
          </div>

          <div className={styles['change-icon']}>
            <SwapOutlined style={{ color: '#ffffff', fontSize: '16px' }} />
          </div>

          <div className={styles['chain-item']}>
            <div className={styles['chain-label']}>To</div>
            <div
              className={`${styles['chain-box']} ${
                toDisabled && styles['chain-box-disabled']
              }`}
            >
              <img src={wan} />
              <p>{'To'}</p>
              <p>{'Network'}</p>
              <div className={styles['chain-box-arrow']}>
                <RightOutlined style={{ color: '#ffffff', fontSize: '16px' }} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles['amount-wrapper']}>
          <div className={styles['amount-label']}>Amount</div>
          <div className={styles['amount-input-wrapper']}>
            <Input onChange={amountChange} />
          </div>
          {amount.length === 0 && (
            <p className={styles['error-text']}>{'Amount is required.'}</p>
          )}
          <div className={styles['fee-wrapper']}>
            <p>
              Fee
              <Tooltip title={'Operation Fee: 0.012 USDC'}>
                <QuestionCircleOutlined />
              </Tooltip>
            </p>
            <p>
              0.012 <img src={wan} />
              USDC
            </p>
          </div>
        </div>

        <Button className={styles['next-button']}>Next</Button>
      </div>

      <TokenModal
        visible={assetModalVisible}
        onOk={() => {
          setAssetModalVisible(false);
        }}
        onCancel={() => {
          setAssetModalVisible(false);
        }}
      />
    </div>
  );
}
