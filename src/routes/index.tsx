import { useEffect } from 'react';
import { match } from 'path-to-regexp';
import { IGetInitialProps } from 'umi';
import { getPost } from '@/services/portalPost';
import { getRoutes } from '@/services/route';
import { getThemeFiles } from '@/services/themeFile';

import DrawerSettings from '@/pages/components/drawerSettings';
import Header from '@/pages/public/header';
import Footer from '@/pages/public/footer';
import Index from '@/pages/index';
import About from '@/pages/about';

// 定义路由规则
const pageReg = '/page/:id';
const categoryReg = '/list/:id';
const articleReg = '/article/:id/cid/:cid';
const tagReg = '/tag/:id';

type pageType = {
  path: string;
  index: string;
  params: {
    id: Number;
  };
};

const inArray = (array: any, key: string, value: string) => {
  for (let i = 0; i < array.length; i++) {
    const item: any = array[i];
    if (item[key] === value) {
      return i;
    }
  }
  return -1;
};

// 获取路由配置页面
const regPage = (routes = [], pathname: string) => {
  const page = {
    type: '404',
    name: '404',
    params: {},
  };
  const index = inArray(routes, 'url', pathname);
  if (index !== -1) {
    const route: any = routes[index];
    const { full_url } = route;
    switch (route.type) {
      case 'index':
        page.type = 'index';
        page.name = 'index';
        page.params = {};
        break;
      case 2:
        // page
        const fn = match(pageReg, { decode: decodeURIComponent });
        const regResult: any = fn(full_url);
        // 路由匹配成功
        if (regResult) {
          const pageId = regResult.params?.id || 0;
          // 请求接口，获取页面数据
          page.type = 'page';
          page.name = 'about';
          page.params = {
            id: pageId,
          };
        }
        break;
    }
  }
  return page;
};

// 获取渲染页面组件
const renderPage = (type = '404', name = '404', data = {}) => {
  let render = <h1>404</h1>;
  switch (type) {
    case 'index':
      render = <Index />;
      break;
    case 'page':
      switch (name) {
        case 'about':
          render = <About data={data} />;
          break;
      }
      break;
  }
  return render;
};

const Routes = (props: any) => {
  const { global } = props;
  let { data = {}, type = '', name = '' } = global;
  return (
    <>
      <DrawerSettings />
      <Header />
      {renderPage(type, name, data)}
      <Footer />
    </>
  );
};

Routes.getInitialProps = (async (ctx: any) => {
  const { history = {}, match = {} } = ctx;
  const { location = {} } = history;
  const { query = {} } = location;
  const { url: pathname = '/' } = match;

  const { token = '' } = query;
  const { store } = ctx;

  let routes: any = [
    {
      full_url: '/',
      url: '/',
      name: 'index',
      type: 'index',
    },
  ];
  const routeRes = await getRoutes();
  if (routeRes.code === 1) {
    const { data = [] } = routeRes;
    data.forEach((item: any) => {
      item.full_url = `/${item.full_url}`;
      item.url = `/${item.url}`;
    });
    routes = [...routes, ...data];
  }
  const page: any = regPage(routes, pathname);
  const { type = '', name = '', params } = page;

  // 请求接口，获取不同的数据
  let data = null;
  switch (type) {
    case 'page':
      const { id } = params;
      const result = await getPost(id, 2);
      if (result.code === 1) {
        data = result.data;
      }
      break;
  }

  // 获取公共头信息
  let headerData = {};
  let footerData = {};
  const publicRes: any = await getThemeFiles({ theme: THEME, is_public: 1 });
  if (publicRes.code === 1) {
    publicRes?.data?.forEach((item: any) => {
      if (item.more_json?.file === 'public/header') {
        headerData = item.more_json;
      } else if (item.more_json?.file === 'public/footer') {
        footerData = item.more_json;
      }
    });
  }

  store.dispatch({
    type: 'global/saveState',
    payload: {
      token,
      type,
      name,
      data,
      routes,
      headerData,
      footerData,
    },
  });

  return store.getState();
}) as IGetInitialProps;

export default Routes;
