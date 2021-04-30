import { useState, useEffect, Fragment } from 'react';
import { Input, Button, Tooltip, message, Modal, Steps } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { history } from 'umi';
import useFormDataModel from '@/models/useFormData';
import useCrossChainModel from '@/models/useCrossChain';
import LoadingIcon from 'components/LoadingIcon';
import wallet from 'components/Wallet';
import { copy } from '@/utils/utils';
import arrow from 'images/swap-right.svg';
import styles from './index.less';

const { Step } = Steps;

const Confirmation = () => {
  const { data, modify } = useFormDataModel();
  const { getTokenLogo, getChainLogo } = useCrossChainModel();
  const [loading, setLoading] = useState(false);
  if (data.step === 0) {
    history.push('/');
    return false;
  }

  const onCancel = () => {};
  const onOK = () => {
    console.log('submit:', data);
    setLoading(true);
  };

  return (
    <Fragment>
      <div className={styles['confirm-wrapper']}>
        <Steps current={1} className={styles['step']}>
          <Step title="Input" />
          <Step title="Confirm" />
          <Step title="Finished" />
        </Steps>

        <div className={styles['title']}>{data.asset} Transaction</div>
        <div className={styles['chain-pair-wrapper']}>
          <div className={styles['chain']}>
            <span>{data.from}</span>
          </div>
          <div className={styles['token-wrapper']}>
            <div className={styles['token']}>
              <img src={getTokenLogo(data.asset)} />
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
          <button className={styles['cancel']} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles['ok']} onClick={onOK}>
            Confirm
          </button>
        </div>
      </div>

      <Modal
        visible={loading}
        closable={false}
        footer={null}
        wrapClassName={styles['loading-wrapper']}
      >
        <LoadingIcon icon={getTokenLogo(data.asset)} />
        <div className={styles['loading-text']}>Waiting...</div>
      </Modal>
    </Fragment>
  );
};

export default Confirmation;
