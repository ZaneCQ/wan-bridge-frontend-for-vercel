import { useState, useEffect, useCallback, useMemo } from 'react';
import { Input, Button, Tooltip, Dropdown, Menu, message } from 'antd';
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
  // console.log('wallet:', wallet);
  // console.log('data:', data);
  const { address, connected } = wallet;
  const {
    getSupportedChainByToken,
    getTokenLogo,
    getChainLogo,
    chains,
  } = useCrossChainModel();
  const balance = 1000;
  const isBTC = useMemo(() => data.asset === 'BTC' && data.from === 'Bitcoin', [
    data.asset,
    data.from,
  ]);
  const isXRP = useMemo(() => data.asset === 'XRP', [data.asset]);

  const checkAddress = useCallback(
    (value) => {
      // console.log('address:', value)
      if (isAddress(value, data.to)) {
        setValidAddress(true);
        return true;
      } else {
        setValidAddress(false);
        return false;
      }
    },
    [data.to],
  );

  const checkAmount = (value) => {
    const isValid = checkNumber(value) && new BigNumber(value).lte(balance);
    setValidAmount(isValid);
    return isValid;
  };

  const checkAll = () => {
    if (
      checkAddress(data.toAddress) &&
      checkAmount(data.amount) &&
      typeof data.asset === 'string' &&
      data.asset.length > 0 &&
      typeof data.from === 'string' &&
      data.from.length > 0 &&
      typeof data.to === 'string' &&
      data.to.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const addressChange = (e) => {
    const value = e.target.value;
    checkAddress(value);
    modify({
      toAddress: value,
    });
  };

  const amountChange = (e) => {
    const value = e.target.value;
    const isValid = checkAmount(value);
    modify({
      amount: value,
      fee: isValid ? new BigNumber(value).times(0.003).toString() : NaN,
    });
  };

  const onExchange = () => {
    modify({
      from: data.to,
      to: data.from,
      // toAddress: '',
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

  const onNext = () => {
    console.log('Form next:', data);
    console.log('wallet:', wallet);
    if (checkAll()) {
      history.push('/confirm');
    } else {
      message.warning('Invalid form data!');
    }
  };

  /* useEffect(() => {
    console.log('step:', data.step);
    history.push('/');
  }, [data.step]); */

  useEffect(() => {
    if (data.from !== null) {
      setToDisabled(false);
    } else {
      setToDisabled(true);
    }
  }, [data.from]);

  useEffect(() => {
    if (typeof data.toAddress === 'string' && data.toAddress.length !== 0) {
      checkAddress(data.toAddress);
    }
  }, [data.to]);

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

  /* useEffect(() => {
    // console.log('sending render');
    // connect();
  }, []); */

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

  // console.log('Index render');

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

        {!connected && !isBTC && !isXRP ? (
          <Button
            className={styles['connect-button']}
            onClick={onConnect2Wallet}
          >
            Connect to Wallet
          </Button>
        ) : (
          <Button className={styles['next-button']} onClick={onNext}>
            Next
          </Button>
        )}
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
