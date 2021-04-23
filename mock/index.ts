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
  '/api/tokens/hot': ['WAN', 'BTC', 'ETH', 'FNX', 'USDT'],
  '/api/tokens/cross-chain': tokens,
};
