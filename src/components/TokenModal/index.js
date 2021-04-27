import { useState, useEffect, useMemo } from 'react';
import { Modal, message, Input, Empty } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import useTokensModel from '@/models/useTokens';
import useHotTokensModel from '@/models/useHotTokens';
import useFormDataModel from '@/models/useFormData';
import useCrossChainModel from '@/models/useCrossChain';
import styles from './index.less';

const TokenModal = (props) => {
  const { onOk } = props;
  const [search, setSearch] = useState('');
  let filteredToken = [];
  const { tokens } = useTokensModel();
  const hotTokens = useHotTokensModel();
  const { data, modify } = useFormDataModel();
  const { getTokenLogo } = useCrossChainModel();
  const selected = data.asset;

  filteredToken = useMemo(() => {
    if (!tokens) {
      return [];
    }
    if (search.length === 0) {
      return tokens;
    } else {
      let reg = new RegExp(search, 'ig');
      return tokens.filter((token) => reg.test(token));
    }
  }, [tokens, search]);

  const onSelect = (token) => {
    // console.log('select:', token, selected);
    if (token !== selected) {
      modify({
        asset: token,
        from: null,
        to: null,
        amount: '0',
        fee: '0',
      });
    }
    props.onOk();
  };

  return (
    <Modal
      title="Select Asset"
      visible={true}
      onCancel={onOk}
      closable={true}
      footer={null}
      wrapClassName={styles['modal-wrapper']}
    >
      <Input
        className={styles['search-input']}
        placeholder={'Search token'}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <div className={styles['hot-token-list']}>
        {hotTokens.map((token) => (
          <span
            className={styles['hot-token-item']}
            key={token}
            onClick={() => onSelect(token)}
          >
            {token}
            {token === selected && (
              <CheckOutlined className={styles['hot-token-checked']} />
            )}
          </span>
        ))}
      </div>

      {tokens.length === 0 ? (
        <Empty description={'No tokens available.'} />
      ) : (
        <ul className={styles['token-list']}>
          {filteredToken.map((token) => (
            <li
              key={token}
              className={`${styles['token-list-item']} ${
                token === selected && styles['token-selected']
              }`}
              onClick={() => onSelect(token)}
            >
              <img src={getTokenLogo(token)} className={styles['token-logo']} />
              {token}
              {token === selected && (
                <CheckOutlined className={styles['token-checked']} />
              )}
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

export default TokenModal;
