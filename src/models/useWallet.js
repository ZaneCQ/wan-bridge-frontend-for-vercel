import { useState, useEffect } from 'react';
import { createModel } from 'hox';
import Web3Modal from '@wandevs/web3modal';
import { WanWalletConnector } from '@web3-react-wan/wanwallet-connector';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';

const getProviderOptions = () => ({
  wanmask: {
    package: {},
    opts: {
      config: {},
    },
  },
  wanwallet: {
    package: new WanWalletConnector({
      chainId: 1,
      url: 'https://gwan-ssl.wandevs.org:56891',
      pollingInterval: 15000,
      requestTimeoutMs: 300000,
    }),
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: '326fb0397704475abffcfa9ca9c0ee5a',
      rpcUrl: 'https://gwan-ssl.wandevs.org:56891',
      chainId: 888,
      networkId: 888,
      rpc: {
        888: 'https://gwan-ssl.wandevs.org:56891',
        999: 'https://gwan-ssl.wandevs.org:46891',
      },
    },
  },
});

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: getProviderOptions(),
});

const useWallet = () => {
  const [address, setAddress] = useState(undefined);
  const [connected, setConnected] = useState(false);
  const [web3, setWeb3] = useState(null);

  const connect = async () => {
    let temporaryProvider;
    try {
      temporaryProvider = await web3Modal.connect();
    } catch (err) {
      console.log('Failed to connect:', err);
      return false;
    }
    await subscribeProvider(temporaryProvider);
    const web3 = new Web3(temporaryProvider);
    setWeb3(web3);
    const accounts = await web3.eth.getAccounts();
    setAddress(accounts[0]);
    setConnected(true);
    return true;
  };

  const reset = async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }

    await web3Modal.clearCachedProvider();

    setConnected(false);
    setAddress(undefined);
    console.log('result:', web3Modal, web3);
  };

  const subscribeProvider = async (provider) => {
    if (!provider.on) {
      return;
    }

    provider.on('accountsChanged', async (accounts) => {
      console.log('accountsChanged:', accounts);
      if (accounts.length === 0) {
        setAddress(undefined);
        setConnected(false);
      } else {
        setAddress(accounts[0]);
        setConnected(true);
      }
    });

    provider.on('chainChanged', async (chainId) => {
      console.log('chainChanged:', chainId);
    });

    provider.on('networkChanged', async (networkId) => {
      console.log('networkChanged:', networkId);
    });

    provider.on('connect', (...info) => {
      console.log('connect:', info);
    });

    provider.on('disconnect', (error) => {
      console.log('disconnect:', error);
      setAddress(undefined);
      setConnected(false);
    });
  };

  useEffect(() => {
    console.log('wallet render');

    if (web3Modal.cachedProvider === 'wanmask' && !window.wanchain) {
      console.log('cleared---');
      web3Modal.clearCachedProvider();
      return;
    }

    if (web3Modal.cachedProvider) {
      console.log('cachedProvider~~~~~~~~', web3Modal.cachedProvider);
      connect();
    }
  }, []);

  console.log({
    address,
    connected,
    connect,
    reset,
  });

  return {
    address,
    connected,
    web3Modal,
    web3,
    connect,
    reset,
  };
};

export default createModel(useWallet);
