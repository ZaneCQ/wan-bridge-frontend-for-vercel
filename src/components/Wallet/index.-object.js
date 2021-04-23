import React from 'react';
import Web3Modal from '@wandevs/web3modal';
import { WanWalletConnector } from '@web3-react-wan/wanwallet-connector';
import Web3 from 'web3';
console.log('===============================s==========================');

const providerOptions = {
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
};

class Wallet {
  constructor() {
    this.createModal();
  }

  createModal = () => {
    this.web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });
  };

  connect = async () => {
    this.provider = await this.web3Modal.connect();
    await this.subscribeProvider(this.provider);
    this.web3 = new Web3(this.provider);
    console.log('web3Modal:', this.web3Modal);
    console.log('provider:', this.provider);
    console.log('web3:', this.web3);

    const accounts = await this.web3.eth.getAccounts();
    const address = accounts[0];
    const networkId = await this.web3.eth.net.getId();
    console.log('Parameters:', { accounts, address, networkId });
  };

  subscribeProvider = async (provider) => {
    if (!provider.on) {
      return;
    }

    provider.on('close', () => this.reset());

    provider.on('accountsChanged', async (accounts) => {
      console.log('accountsChanged:', accounts);
    });

    provider.on('chainChanged', async (args) => {
      console.log('chainChanged:', args);
    });

    provider.on('networkChanged', async (networkId) => {
      console.log('networkChanged:', networkId);
    });
  };

  reset = async () => {
    const web3 = this.web3;
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await this.web3Modal.clearCachedProvider();
    /* this.setWallet({ ...INITIAL_STATE, 
      resetApp: this.resetApp,
      connect: this.onConnect
    }); */
  };
}

/* const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
}); */

/* web3Modal.connect().then(provider => {
  console.log('web3Modal:', web3Modal);
  console.log('provider:', provider);
  const web3 = new Web3(provider);
  console.log('web3:', web3);
}) */

/* const provider = await web3Modal.connect();

const web3 = new Web3(provider);

console.log('web3Modal:', web3Modal);
console.log('provider:', provider);
console.log('web3:', web3); */
export default new Wallet();
// export default 1;
// export default web3;
// export default web3Modal;
