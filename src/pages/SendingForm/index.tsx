import { useState, useEffect } from 'react';
import { Input, Button, Tooltip, message } from 'antd';
import { history } from 'umi';
import {
  RightOutlined,
  SwapOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import BigNumber from 'bignumber.js';
import TokenModal from 'components/TokenModal';
import NetworkModal from 'components/NetworkModal';
import wallet from 'components/Wallet';
import useCrossChainModel from '@/models/useCrossChain';
import useTokensModel from '@/models/useTokens';
import useFormDataModel from '@/models/useFormData';
import { isAddress, checkNumber } from '@/utils/utils';
import styles from './index.less';

const FALSE = 0;
const FROM = 1;
const TO = 2;
// console.log('wallet:', wallet);

export default function IndexPage() {
  console.log('Render Index page.');
  const [toDisabled, setToDisabled] = useState(true);
  const [validAddress, setValidAddress] = useState(true);
  const [validAmount, setValidAmount] = useState(true);
  const [assetModalVisible, setAssetModalVisible] = useState(false);
  const [need2Connect2Wallet, setNeed2Connect2Wallet] = useState(false);
  const [networkModalVisible, setNetworkModalVisible] = useState(0); // false: 0, 'from': 1, 'to': 2

  const tokens = useTokensModel();
  const { data, modify } = useFormDataModel();
  const { getTokenLogo, getChainLogo } = useCrossChainModel();
  const balance = 10;
  const checkAddress = (value) => {
    if (isAddress(value, data.to)) {
      setValidAddress(true);
    } else {
      setValidAddress(false);
    }
  };

  const addressChange = (e) => {
    const value = e.target.value;
    checkAddress(value);
    modify({
      toAddress: value,
    });
  };

  const checkAmount = (value) => {
    const isValid = checkNumber(value) && new BigNumber(value).lte(balance);
    setValidAmount(isValid);
    return isValid;
  };

  const amountChange = (e) => {
    const value = e.target.value;
    const isValid = checkAmount(value);
    modify({
      amount: value,
      fee: isValid ? new BigNumber(value).times(0.003).toString() : NaN,
    });
  };

  const onNext = () => {
    // console.log('Form next:', data);
    console.log('wallet:', wallet);
    // connect2Wallet();
    history.push('/confirm');
  };

  const connect2Wallet = async () => {
    if (wallet !== null) {
      wallet.reset().then(wallet.connect);
    }
  };

  const onExchange = () => {
    modify({
      from: data.to,
      to: data.from,
      toAddress: '',
    });
  };

  /* useEffect(() => {
    if (!!data.from && !!data.to && checkAmount(data.amount)) {

    }
  }, [data.asset, data.from, data.to, data.amount, data.toAddress]); */

  useEffect(() => {
    console.log('Effect address:', wallet.address);
  }, [wallet.address]);

  useEffect(() => {
    modify({
      asset: tokens[0],
    });
  }, [tokens]);

  useEffect(() => {
    if (data.from !== null) {
      setToDisabled(false);
    } else {
      setToDisabled(true);
    }
  }, [data.from]);

  return (
    <>
      <div className={styles['form-wrapper']}>
        <div className={styles['title']}>WAN Bridge</div>

        {/* Asset */}
        <div className={`${styles['fake-input-label']} label`}>Asset</div>
        <div
          className={styles['fake-input-panel']}
          onClick={() => {
            setAssetModalVisible(true);
          }}
        >
          <div className={styles['fake-input-icon']}>
            <img src={getTokenLogo(data.asset)} />
          </div>
          <div className={styles['fake-input-text']}>{data.asset}</div>
          <RightOutlined style={{ color: '#ffffff' }} />
        </div>

        <div className={styles['chain-pair-wrapper']}>
          {/* From */}
          <div className={styles['chain-item']}>
            <div className={`${styles['chain-label']} label`}>{'From'}</div>
            <div
              className={styles['chain-box']}
              onClick={() => {
                setNetworkModalVisible(FROM);
              }}
            >
              <img src={getChainLogo(data.from)} />
              <p /* className="label" */>{data.from ? data.from : 'From'}</p>
              <p /* className="label" */>{'Network'}</p>
              <div className={styles['chain-box-arrow']}>
                <RightOutlined style={{ color: '#ffffff', fontSize: '16px' }} />
              </div>
            </div>
          </div>

          {/* Exchange Icon */}
          <div className={styles['exchange-icon']}>
            <SwapOutlined
              style={{ color: '#ffffff', fontSize: '16px' }}
              onClick={onExchange}
            />
          </div>

          {/* To */}
          <div className={styles['chain-item']}>
            <div className={`${styles['chain-label']} label`}>{'To'}</div>
            <div
              className={`${styles['chain-box']} ${
                toDisabled && styles['chain-box-disabled']
              }`}
              onClick={() => {
                if (toDisabled) {
                  return;
                }
                setNetworkModalVisible(TO);
              }}
            >
              <img src={getChainLogo(data.to)} />
              <p>{data.to ? data.to : 'To'}</p>
              <p>{'Network'}</p>
              <div className={styles['chain-box-arrow']}>
                <RightOutlined style={{ color: '#ffffff', fontSize: '16px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* To Address */}
        <div className={styles['address-wrapper']}>
          <div className={`${styles['address-label']} label`}>Recipient</div>
          <div className={styles['address-input-wrapper']}>
            <Input
              disabled={toDisabled || data.to === null}
              placeholder={'Please input the recipient address'}
              onChange={addressChange}
              value={data.toAddress}
            />
          </div>
          {!validAddress && (
            <div className={styles['error-text']}>{'Invalid address.'}</div>
          )}
        </div>

        {/* Amount */}
        <div className={styles['amount-wrapper']}>
          <div className={`${styles['amount-label']} label`}>Amount</div>
          <div className={styles['amount-input-wrapper']}>
            <Input onChange={amountChange} value={data.amount} />
          </div>
          {!validAmount && (
            <div className={styles['error-text']}>{'Invalid amount.'}</div>
          )}

          <div className={styles['balance-wrapper']}>
            <span className={'label'}>Balance:</span>
            <span className={'value'}>
              {balance} {data.asset}
            </span>
          </div>

          <div className={styles['fee-wrapper']}>
            <div>
              <span className={'label'}>Fee</span>
              <Tooltip title={`Operation Fee: ${data.fee} ${data.asset}`}>
                <QuestionCircleOutlined />
              </Tooltip>
            </div>
            <div>
              {data.fee}
              <img src={getTokenLogo(data.asset)} />
              {data.asset}
            </div>
          </div>
        </div>

        {/* {
          need2Connect2Wallet ? (
            <Button className={styles['next-button']} onClick={connect2Wallet}>Connect to Wallet</Button>
          ) : (
            <Button className={styles['next-button']} onClick={onNext}>Next</Button>
          )
        } */}
        <Button className={styles['next-button']} onClick={connect2Wallet}>
          Connect to Wallet
        </Button>
        <Button className={styles['next-button']} onClick={onNext}>
          Next
        </Button>
      </div>

      {assetModalVisible && (
        <TokenModal
          onOk={() => {
            setAssetModalVisible(false);
          }}
        />
      )}

      {networkModalVisible !== FALSE && (
        <NetworkModal
          onOk={() => {
            setNetworkModalVisible(FALSE);
          }}
          isFrom={networkModalVisible === FROM}
        />
      )}
    </>
  );
}
