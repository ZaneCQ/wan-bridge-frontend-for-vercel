import { defineConfig } from 'umi';
import path from 'path';

const resolve = (dir) => path.join(__dirname, dir);

export default defineConfig({
  title: 'WAN Bridge',
  nodeModulesTransform: {
    type: 'none',
  },
  history: { type: 'hash' },
  fastRefresh: {},
  alias: {
    images: resolve('./src/assets/images'),
    languages: resolve('./src/assets/locals'),
    components: resolve('./src/components'),
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
      routes: [
        { path: '/', component: 'SendingForm' },
        { path: '/confirm', component: 'Confirmation' },
        { path: '/xrp', component: 'XRPConfirmation' },
      ],
    },
  ],
});
