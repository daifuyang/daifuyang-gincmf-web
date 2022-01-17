import header from '@/pages/public/header.json';
import footer from '@/pages/public/footer.json';
import index from '@/pages/index.json';

import { theme } from '@/services/install';

const install = (props: any) => {
  return <h1>更新成功</h1>;
};

install.getInitialProps = async (ctx: any) => {
  const { history = {}, match = {} } = ctx;
  const { location = {} } = history;
  const { query = {} } = location;
  const { token = '' } = query;

  const state = ctx.store.getState();

  const result = await theme({
    token,
    theme: THEME,
    version: VERSION,
    theme_file: [JSON.stringify(header), JSON.stringify(footer)],
  });

  return state
};

export default install;
