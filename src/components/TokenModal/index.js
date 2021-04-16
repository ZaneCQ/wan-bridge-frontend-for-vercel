import { useState, useEffect, useMemo } from 'react';
import { Modal, message, Input, Empty } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import useTokensModel from '@/models/useTokens';
import useHotTokensModel from '@/models/useHotTokens';
import useFormDataModel from '@/models/useFormData';
import styles from './index.less';

const TokenModal = (props) => {
  const { visible, onOk, onCancel } = props;
  const [search, setSearch] = useState('');
  let filteredToken = [];
  const tokens = useTokensModel();
  const hotTokens = useHotTokensModel();
  const formModel = useFormDataModel();

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

  // console.log('----------render-----------');
  // console.log('tokens:', tokens);
  // console.log('hotTokens:', hotTokens);
  // console.log('search:', search);
  // console.log('filteredToken:', filteredToken);
  const selected = formModel.data.asset;

  return (
    <Modal
      title="Select Asset"
      visible={true}
      onOk={onOk}
      onCancel={onCancel}
      closable={false}
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
          <span className={styles['hot-token-item']} key={token}>
            {token}
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
              onClick={() => {
                console.log('select:', token);
                formModel.modify({ asset: token });
                props.onOk();
              }}
            >
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
