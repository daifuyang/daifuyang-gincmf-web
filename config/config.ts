import { defineConfig } from 'umi';
import routes from './routes'
import proxy from './proxy'

const outputPath = 'dist/';
const env = process.env.NODE_ENV;
const path = env === 'development' ? 'http://127.0.0.1:8000/' : outputPath;

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title:'gincmf内容管理系统',
  locale:{
    default: 'zh-CN',
  },
  define:{
    HOST:"http://localhost:4000",
    THEME:"二零二二",
    VERSION:"0.0.1",
  },
  routes,
  proxy: proxy['dev'],
  fastRefresh: {},
  ssr: {},
  dva: {
    immer: true,
  },
  // mfsu:{},
  outputPath: outputPath,
  publicPath: path,
});
