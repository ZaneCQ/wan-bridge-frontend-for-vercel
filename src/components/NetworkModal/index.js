import { useState, useEffect, useMemo } from 'react';
import { Modal, message, Input, Empty } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import useCrossChainModel from '@/models/useCrossChain';
import useFormDataModel from '@/models/useFormData';
import styles from './index.less';

const NetworkModal = (props) => {
  const { isFrom, onOk } = props;
  const crossChainModel = useCrossChainModel();
  const { getSupportedChainByToken, getChainLogo } = crossChainModel;
  const { data, modify } = useFormDataModel();
  const networks = getSupportedChainByToken(data.asset);
  let filteredNet = useMemo(
    () => networks.filter((net) => net !== (isFrom ? data.to : data.from)),
    [isFrom, networks, data.from, data.to],
  );

  const onSelect = (net) => {
    modify({
      [isFrom ? 'from' : 'to']: net,
    });
    onOk();
  };

  const selected = isFrom ? data.from : data.to;

  return (
    <Modal
      title="Select Network"
      visible={true}
      onCancel={onOk}
      closable={true}
      footer={null}
      wrapClassName={styles['modal-wrapper']}
      width={520}
    >
      <div className={styles['chain-wrapper']}>
        {filteredNet.length === 0 ? (
          <Empty description={'No networks available.'} />
        ) : (
          <ul className={styles['chain-list']}>
            {filteredNet.map((chain) => (
              <li
                key={chain}
                className={`${styles['chain-list-item']} ${
                  chain === selected && styles['chain-selected']
                }`}
                onClick={() => onSelect(chain)}
              >
                <img
                  src={getChainLogo(chain)}
                  className={styles['chain-logo']}
                />
                {chain}
                {chain === selected && (
                  <CheckOutlined className={styles['chain-checked']} />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default NetworkModal;
