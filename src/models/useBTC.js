import { useState, useEffect } from 'react';
import { createModel } from 'hox';

const useBTC = () => {
  const [address, setAddress] = useState('');
  const getData = () => {
    fetch(
      'https://wan-bridge-frontend-server-for-vercel.vercel.app/api/btc/address',
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log('##### address:', res);
        setAddress(res.data);
      })
      .catch((err) => {
        console.log('failed to fetch address:', err);
      });
  };

  useEffect(getData, []);

  return { address, getData };
};

export default createModel(useBTC);
