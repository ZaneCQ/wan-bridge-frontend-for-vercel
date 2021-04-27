import { useState, useEffect } from 'react';
import { createModel } from 'hox';

const useTokens = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTokens = () => {
    setLoading(true);
    fetch('/api/tokens')
      .then((res) => res.json())
      .then((res) => {
        console.log('##### tokens:', res);
        setTokens(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log('failed to fetch tokens:', err);
        setLoading(false);
      });
  };
  useEffect(getTokens, []);

  return { tokens, getTokens, loading };
};

export default createModel(useTokens);
