import { useState, useEffect } from 'react';
import { Input, Button, Tooltip, Spin, Dropdown, Menu, message } from 'antd';
import { history } from 'umi';
import {
  RightOutlined,
  SwapOutlined,
  QuestionCircleOutlined,
  DisconnectOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import BigNumber from 'bignumber.js';
import TokenModal from 'components/TokenModal';
import NetworkModal from 'components/NetworkModal';
import useCrossChainModel from '@/models/useCrossChain';
import useTokensModel from '@/models/useTokens';
import useFormDataModel from '@/models/useFormData';
import useWalletModel from '@/models/useWallet';
import { isAddress, checkNumber, clipString } from '@/utils/utils';
import styles from './index.less';

const FALSE = 0;
const FROM = 1;
const TO = 2;

export default function IndexPage() {
  const [toDisabled, setToDisabled] = useState(true);
  const [validAddress, setValidAddress] = useState(true);
  const [validAmount, setValidAmount] = useState(true);
  const [assetModalVisible, setAssetModalVisible] = useState(false);
  const [networkModalVisible, setNetworkModalVisible] = useState(0); // false: 0, 'from': 1, 'to': 2

  const { tokens } = useTokensModel();
  const { data, modify } = useFormDataModel();
  const wallet = useWalletModel();
  const { address, connected } = wallet;
  const {
    getSupportedChainByToken,
    getTokenLogo,
    getChainLogo,
    chains,
  } = useCrossChainModel();
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
    console.log('Form next:', data);
    console.log('wallet:', wallet);
    history.push('/confirm');
  };

  const onExchange = () => {
    modify({
      from: data.to,
      to: data.from,
      toAddress: '',
    });
  };

  const connect = () => {
    wallet.connect();
  };

  const disconnect = () => {
    wallet.reset();
  };

  const onConnect2Wallet = () => {
    console.log('onConnect2Wallet - wallet:', wallet);
    if (wallet !== null) {
      wallet.reset().then(connect);
    }
  };

  /* useEffect(() => {
    if (!!data.from && !!data.to && checkAmount(data.amount)) {

    }
  }, [data.asset, data.from, data.to, data.amount, data.toAddress]); */

  useEffect(() => {
    if (data.from !== null) {
      setToDisabled(false);
    } else {
      setToDisabled(true);
    }
  }, [data.from]);

  // Initialize form data.
  useEffect(() => {
    let supportedChains = getSupportedChainByToken(tokens[0]);
    const timer = setTimeout(() => {
      modify({
        asset: tokens[0],
        from: supportedChains[0],
        to: supportedChains[1],
      });
    });

    return () => {
      clearTimeout(timer);
    };
  }, [tokens, chains]);

  useEffect(() => {
    const timer = setTimeout(() => {
      modify({
        fromAddress: address,
      });
    });

    return () => {
      clearTimeout(timer);
    };
  }, [address]);

  useEffect(() => {
    console.log('sending render');
    // connect();
  }, []);

  const menu = (
    <Menu>
      <Menu.Item onClick={disconnect}>
        <DisconnectOutlined />
        <span>Disconnect</span>
      </Menu.Item>
      <Menu.Item onClick={onConnect2Wallet}>
        <SwapOutlined />
        <span>Switch to other wallet</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className={styles['form-wrapper']}>
        <div className={styles['title']}>WAN Bridge</div>

        {connected ? (
          <Dropdown
            overlay={menu}
            placement="bottomCenter"
            overlayClassName={styles['wallet-dropdown-wrapper']}
          >
            <button
              className={`${styles['connection']} ${styles['connected-address']}`}
            >
              <WalletOutlined />
              {clipString(data.fromAddress, 14)}
            </button>
          </Dropdown>
        ) : (
          <div
            className={`${styles['connection']} ${styles['connect-to-wallet']}`}
            onClick={onConnect2Wallet}
          >
            Connect to Wallet
          </div>
        )}

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
              <p>{data.from ? data.from : 'From'}</p>
              <p>{'Network'}</p>
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

        <Spin
          spinning={!connected}
          wrapperClassName={styles['unconnected-to-wallet-mask']}
          indicator={<div onClick={onConnect2Wallet}>Connect to Wallet</div>}
        >
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

          <Button className={styles['next-button']} onClick={onNext}>
            Next
          </Button>
        </Spin>
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
