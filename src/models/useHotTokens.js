import { useState, useEffect } from 'react';
import { createModel } from 'hox';

const useHotTokens = () => {
  const [tokens, setTokens] = useState([]);
  useEffect(() => {
    fetch('/api/tokens/hot')
      .then((res) => res.json())
      .then((res) => {
        // console.log('##### hot tokens:', res);
        setTokens(res);
      })
      .catch((err) => {
        console.log('failed to fetch hot tokens:', err);
      });
  }, []);
  return tokens;
};

export default createModel(useHotTokens);
