import { defineConfig } from 'umi';
import path from 'path';

const resolve = (dir) => path.join(__dirname, dir);

export default defineConfig({
  title: 'WAN Bridge',
  nodeModulesTransform: {
    type: 'none',
  },
  history: { type: 'hash' },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  alias: {
    images: resolve('./src/assets/images'),
    languages: resolve('./src/assets/locals'),
    components: resolve('./src/components'),
  },
});
