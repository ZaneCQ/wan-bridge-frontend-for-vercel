import { useState, useEffect, useMemo } from 'react';
import { Modal, message, Skeleton, Input } from 'antd';
import { useRequest } from 'ahooks';
import styles from './index.less';

const TokenModal = (props) => {
  const { visible, onOk, onCancel } = props;
  const [tokens, setTokens] = useState([]);
  const [hotTokens, setHotTokens] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredToken, setFilteredToken] = useState([]);
  /* const { data, error, loading } = useRequest('/api/tokens', {
        onSuccess: (result) => {
            console.log('success:', result);
            if (result) {
                setTokens(result);
                // message.success(`Get tokens successfully`);
            }
        },
    });

    useRequest('/api/tokens/hot', {
        onSuccess: (result) => {
            console.log('hot success:', result);
            if (result) {
                setHotTokens(result);
                // message.success(`Get hot tokens successfully`);
            }
        },
    });

    useMemo(() => {
        if (search.length !== 0) {
            let reg = new RegExp(search, 'ig');
            setFilteredToken(tokens.filter(token => reg.test(token)));
        }
    }, [tokens, search]);

    console.log('tokens:', tokens);
    console.log('hotTokens:', hotTokens);
    console.log('search:', search);
    console.log('filteredToken:', filteredToken); */

  const { data, error, loading } = useRequest('/api/tokens');

  useRequest('/api/tokens/hot', {
    onSuccess: (result) => {
      // console.log('hot success:', result);
      if (result) {
        setHotTokens(result);
      }
    },
  });

  useMemo(() => {
    if (search.length !== 0) {
      let reg = new RegExp(search, 'ig');
      setFilteredToken(tokens.filter((token) => reg.test(token)));
    }
  }, [tokens, search]);
  console.log('----------render-----------');
  // console.log('tokens:', tokens);
  // console.log('hotTokens:', hotTokens);
  // console.log('search:', search);
  // console.log('filteredToken:', filteredToken);
  console.log('data:', data);

  return (
    <Modal
      title="Select Asset"
      visible={visible}
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
      <ul className={styles['token-list']}>
        {loading ? (
          <Skeleton active />
        ) : (
          (data || []).map((token) => (
            <li key={token} className={styles['token-list-item']}>
              {token}
            </li>
          ))
        )}
      </ul>
    </Modal>
  );
};

export default TokenModal;
