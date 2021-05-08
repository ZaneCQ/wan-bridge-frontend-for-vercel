import mockjs from 'mockjs';

const tokens = {
  WAN: ['Wanchain', 'Ethereum'],
  ETH: ['Wanchain', 'Ethereum'],
  BTC: ['Bitcoin', 'Wanchain', 'Ethereum'],
  Link: ['Wanchain', 'Ethereum'],
  FNX: ['Wanchain', 'Ethereum'],
  USDT: ['Wanchain', 'Ethereum'],
  USDC: ['Wanchain', 'Ethereum'],
  BUSD: ['Wanchain', 'Ethereum'],
  MKR: ['Wanchain', 'Ethereum'],
  XRP: ['Wanchain', 'Ethereum'],
  ZXC: ['Wanchain', 'Ethereum'],
  TUSD: ['Wanchain', 'Ethereum'],
  GUSD: ['Wanchain', 'Ethereum'],
  EURS: ['Wanchain', 'Ethereum'],
  UNI: ['Wanchain', 'Ethereum'],
  SWAP: ['Wanchain', 'Ethereum'],
  ZCN: ['Wanchain', 'Ethereum'],
  VIBE: ['Wanchain', 'Ethereum'],
  OCEAN: ['Wanchain', 'Ethereum'],
};

mockjs.Random.extend({
  chain: function () {
    return this.pick(['Bitcoin', 'Wanchain', 'Ethereum']);
  },
  tokens: function () {
    return this.pick(Object.keys(tokens));
  },
  addresses: function () {
    return this.pick([
      '0xb2edde501500ddcc1ccb108e0a9fd2dfb303c860',
      '0xf912E0aEE15f568E5075a33456225dEa3a11B29b',
      '14a4zeC1uc84XEZSM4nQQkpBes8Zuu5ieQ',
    ]);
  },
});

export default {
  /* // 支持值为 Object 和 Array
    'GET /api/users': { users: [1, 2] },

    // GET 可忽略
    '/api/users/1': { id: 1 },

    // 支持自定义函数，API 参考 express@4
    'POST /api/users/create': (req, res) => {
        // 添加跨域请求头
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.end('ok');
    }, */

  '/api/tokens': Object.keys(tokens),
  '/api/tokens/hot': ['WAN', 'BTC', 'ETH', 'XRP', 'USDT'],
  '/api/tokens/cross-chain': tokens,
  '/api/xrp/address': { data: '0x00000000000000000000000000000' },
  '/api/xrp/tag': { data: '110' },
  '/api/btc/address': { data: '0x00000000000000000000000000011' },
  '/api/btc/tag': { data: '8' },
  '/api/history/list': mockjs.mock({
    'list|40': [
      {
        'key|+1': 0,
        asset: '@tokens',
        amount: () => mockjs.Random.natural(0, 10000),
        from: '@chain',
        to: '@chain',
        address: '@addresses',
        'time|+1': () => mockjs.Random.datetime('yyyy-MM-dd HH:mm:ss'),
      },
    ],
  }),
};
