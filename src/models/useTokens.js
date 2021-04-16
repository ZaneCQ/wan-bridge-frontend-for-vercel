import { useState, useEffect } from 'react';
import { createModel } from 'hox';

const useTokens = () => {
  const [tokens, setTokens] = useState([]);
  useEffect(() => {
    fetch('/api/tokens')
      .then((res) => res.json())
      .then((res) => {
        // console.log('##### tokens:', res);
        setTokens(res);
      })
      .catch((err) => {
        console.log('failed to fetch tokens:', err);
      });
  }, []);
  return tokens;
};

export default createModel(useTokens);
