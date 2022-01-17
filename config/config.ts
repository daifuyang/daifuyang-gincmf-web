import { defineConfig } from 'umi';
import routes from './routes'
import proxy from './proxy'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title:'gincmf内容管理系统',
  define:{
    HOST:"http://localhost:4000",
    THEME:"二零二二",
    VERSION:"0.0.1",
  },
  routes,
  proxy: proxy['dev'],
  fastRefresh: {},
  ssr: {},
  dva: {}
});
