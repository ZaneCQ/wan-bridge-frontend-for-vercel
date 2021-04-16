import { useState, useEffect } from 'react';
import { Form, Input, Button, Tooltip, Modal, message } from 'antd';
import {
  RightOutlined,
  SwapOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import TokenModal from 'components/TokenModal';
import useTokensModel from '@/models/useTokens';
import useFormDataModel from '@/models/useFormData';
import wan from 'images/wan.png';
import styles from './index.less';

export default function IndexPage() {
  // const [asset, setAsset] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [toDisabled, setToDisabled] = useState(true);
  const [assetModalVisible, setAssetModalVisible] = useState(false);
  const tokens = useTokensModel();
  const formModel = useFormDataModel();

  const { data, modify } = formModel;
  // console.log('tokens:', tokens);
  // console.log('formModel:', formModel);
  console.log('data:', data);

  const amountChange = (e) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    modify({
      asset: tokens[0],
    });
  }, [tokens]);

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
          <div className={styles['fake-input-text']}>{data.asset}</div>
          <RightOutlined style={{ color: '#ffffff' }} />
        </div>

        <div className={styles['chain-pair-wrapper']}>
          <div className={styles['chain-item']}>
            <div className={styles['chain-label']}>
              {data.from ? data.from : 'From'}
            </div>
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
            <div className={styles['chain-label']}>
              {data.to ? data.to : 'To'}
            </div>
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
            <Input onChange={amountChange} defaultValue={data.amount} />
          </div>
          {data.amount.length === 0 && (
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
              {data.fee}
              <img src={wan} />
              {data.asset}
            </p>
          </div>
        </div>

        <Button className={styles['next-button']}>Next</Button>
      </div>

      {assetModalVisible && (
        <TokenModal
          // visible={assetModalVisible}
          onOk={() => {
            setAssetModalVisible(false);
          }}
          onCancel={() => {
            setAssetModalVisible(false);
          }}

          /* onSelect={(token) => {
          setAssetModalVisible(false);

        }} */
        />
      )}
    </div>
  );
}
