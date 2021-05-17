import { useState, useEffect } from 'react';
import { createModel } from 'hox';
import Identicon from 'identicon.js';
import { convertStr2Hex_custom } from '@/utils/utils';
import btc from 'images/btc.png';
import eth from 'images/eth.png';
import usdc from 'images/usdc.png';
import usdt from 'images/usdt.png';
import wan from 'images/wan.png';
import ocean from 'images/ocean.png';

const useCrossChain = () => {
  const [tokens, setTokens] = useState([]);
  const doFetch = () => {
    fetch(
      'https://wan-bridge-frontend-server-for-vercel.vercel.app/api/tokens/cross-chain',
    )
      .then((res) => res.json())
      .then((res) => {
        // console.log('##### CC:', res);
        setTokens(res);
      })
      .catch((err) => {
        console.log('failed to fetch CC:', err);
      });
  };
  useEffect(doFetch, []);
  return {
    chains: tokens,
    getSupportedChainByToken: (chain) => tokens[chain] || [],
    getTokenLogo: (token) => {
      switch (token) {
        case 'WAN':
          return wan;
        case 'BTC':
          return btc;
        case 'ETH':
          return eth;
        case 'USDC':
          return usdc;
        case 'USDT':
          return usdt;
        case 'OCEAN':
          return ocean;
        default:
          return (
            'data:image/png;base64,' +
            new Identicon(convertStr2Hex_custom(token)).toString()
          );
      }
    },
    getChainLogo: (chain) => {
      switch (chain) {
        case 'Wanchain':
          return wan;
        case 'Bitcoin':
          return btc;
        case 'Ethereum':
          return eth;
        default:
          return (
            'data:image/png;base64,' +
            new Identicon(convertStr2Hex_custom(chain)).toString()
          );
      }
    },
  };
};

export default createModel(useCrossChain);
