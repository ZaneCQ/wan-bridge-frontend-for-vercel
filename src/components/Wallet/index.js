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

class Wallet {
  constructor() {
    this.connected = false;
    this.address = undefined;
    this.createModal();
    this.clearCacheWhenWanMaskUninstalled();
  }

  createModal = () => {
    this.web3Modal = new Web3Modal({
      // network: 'mainnet', // optional
      cacheProvider: true,
      providerOptions: getProviderOptions(),
    });
  };

  connect = async () => {
    try {
      this.provider = await this.web3Modal.connect();
    } catch (err) {
      console.log('Failed to connect:', err);
      return false;
    }
    await this.subscribeProvider(this.provider);
    this.web3 = new Web3(this.provider);
    const accounts = await this.web3.eth.getAccounts();
    this.address = accounts[0];
    this.connected = true;
    this.chainId = await this.web3.eth.net.getId();
    console.log('Parameters:', {
      accounts,
      address: this.address,
      chainId: this.chainId,
    });
    return true;
  };

  reset = async () => {
    const web3 = this.web3;
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await this.web3Modal.clearCachedProvider();
    this.connected = false;
    this.address = undefined;
    this.chainId = undefined;
  };

  clearCacheWhenWanMaskUninstalled = () => {
    if (this.web3Modal.cachedProvider === 'wanmask' && !window.wanchain) {
      this.web3Modal.clearCachedProvider();
    }
  };

  subscribeProvider = async (provider) => {
    if (!provider.on) {
      return;
    }

    provider.on('accountsChanged', async (accounts) => {
      console.log('accountsChanged:', accounts);
      if (accounts.length === 0) {
        this.address = undefined;
        this.connected = false;
      } else {
        this.address = accounts[0];
        this.connected = true;
      }
    });

    provider.on('chainChanged', async (chainId) => {
      console.log('chainChanged:', chainId);
      this.chainId = chainId;
    });

    provider.on('connect', (...info) => {
      console.log('connect:', info);
    });

    provider.on('disconnect', (error) => {
      console.log('disconnect:', error);
      this.address = undefined;
      this.connected = false;
    });
  };
}

export default new Wallet();
