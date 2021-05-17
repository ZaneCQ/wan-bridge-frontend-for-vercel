import { useState, useEffect } from 'react';
import { createModel } from 'hox';

const useXRP = () => {
  const [address, setAddress] = useState('');
  const [tag, setTag] = useState('');
  const getData = () => {
    fetch(
      'https://wan-bridge-frontend-server-for-vercel.vercel.app/api/xrp/address',
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log('##### address:', res);
        setAddress(res.data);
      })
      .catch((err) => {
        console.log('failed to fetch address:', err);
      });

    fetch(
      'https://wan-bridge-frontend-server-for-vercel.vercel.app/api/xrp/tag',
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log('##### tag:', res);
        setTag(res.data);
      })
      .catch((err) => {
        console.log('failed to fetch tag:', err);
      });
  };

  useEffect(getData, []);

  return { address, tag, getData };
};

export default createModel(useXRP);
