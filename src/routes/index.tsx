import { useEffect } from 'react';
import { match } from 'path-to-regexp';
import { IGetInitialProps, connect, isBrowser } from 'umi';
import { getPosts, getPost } from '@/services/portalPost';
import { getCategory } from '@/services/portalCategory';
import { getRoutes } from '@/services/route';
import { getThemeFiles, getThemeFile } from '@/services/themeFile';

import { Result, Skeleton, Spin } from 'antd';
import Login from '@/pages/public/login';
import DrawerSettings from '@/pages/components/drawerSettings';

import Index from '@/pages/index';
import About from '@/pages/About';
import Blog from '@/pages/Blog';
import Detail from '@/pages/detail';

import NotFound from '@/pages/404';

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
    if (item.pattern === 1) {
      if (item[key] === value) {
        return item;
      }
    } else if (item.pattern === 2) {
      const fn = match(item.url, { decode: decodeURIComponent });
      if (fn(value)) {
        return { ...item, full_url: value };
      }
    }
  }
  return -1;
};

// 获取路由配置页面
const regPage = async (routes = [], pathname: string, extra: any = {}) => {
  const { query = {}, dispatch } = extra;
  const { page = 1, pageSize = 10, cid = 0 } = query;

  const regData: any = {
    type: '404',
    name: '404',
    params: {},
  };

  const route = inArray(routes, 'url', pathname);
  if (route) {
    const { type, url, full_url } = route;
    let fn, regResult: any;
    switch (type) {
      case 'index':
        regData.type = 'index';
        regData.name = 'index';
        regData.params = {};
        break;
      case 1:
        // list
        fn = match(categoryReg, { decode: decodeURIComponent });
        regResult = fn(full_url);
        if (regResult) {
          const categoryId = regResult.params?.id || 0;

          // 获取文章列表
          const categoryRes = await getCategory(categoryId);
          if (categoryRes.code === 1) {
            //   获取面包屑数据
            const category = categoryRes.data;
            regData.type = 'list';
            regData.name = category.list_tpl;
            regData.params = {
              id: categoryId,
            };

            // 保存分类数据
            await dispatch({
              type: 'postCategory/saveState',
              payload: {
                category,
              },
            });

            // 请求查询列表数据
            await dispatch({
              type: 'postCategory/fetchData',
              payload: {
                categoryId,
              },
            });
          }
        }
        break;
      case 2:
        // page
        fn = match(pageReg, { decode: decodeURIComponent });
        regResult = fn(full_url);
        // 路由匹配成功
        if (regResult) {
          const pageId = regResult.params?.id || 0;
          const postResult = await getPost(pageId, 2);
          if (postResult.code === 1) {
            const postData = postResult.data;
            // 请求接口，获取页面数据
            regData.type = 'page';
            regData.name = postData.template;
            regData.params = {
              id: pageId,
            };
          } else {
            regData.err = postResult.msg;
          }
        }
        break;
      case 3:
        // 进行模板渲染
        fn = match(url, { decode: decodeURIComponent });
        regResult = fn(pathname);
        // 路由匹配成功
        if (regResult) {
          const postId = regResult.params?.id || 0;
          const postResult = await getPost(postId, 1);
          if (postResult.code === 1) {
            // 查询所有评论列表
            await dispatch({
              type: 'comment/fetchData',
              payload: {
                id: postId,
              },
            });

            // 查询当前用户是否点赞
            await dispatch({
              type: 'post/fetchIsLike',
              payload: {
                id: postId,
              },
            });

            const postData = postResult.data;
            // 请求接口，获取页面数据
            regData.type = 'article';
            regData.name = postData.template;
            regData.params = {
              id: postId,
            };

            if (cid) {
              await dispatch({
                type: 'postCategory/fetchCategory',
                payload: {
                  categoryId: cid,
                },
              });

              // 请求查询列表数据
              await dispatch({
                type: 'postCategory/fetchData',
                payload: {
                  categoryId: cid,
                },
              });
            }

            dispatch({
              type: 'post/saveState',
              payload: {
                data: postData,
              },
            });
          }
        }
        break;
    }
  }
  return regData;
};

// 获取渲染页面组件
const renderPage = (props: any = {}) => {
  const { global = {} } = props;
  const { type = '', name = '' } = global;
  let render = (
    <Skeleton
      style={{ maxWidth: '1100px', margin: '0 auto' }}
      paragraph={{ rows: 10 }}
      active
    />
  );

  switch (type) {
    case 'index':
      render = <Index />;
      break;
    case 'page':
      switch (name) {
        case 'about':
          render = <About {...props} />;
          break;
      }
      break;
    case 'list':
      switch (name) {
        default:
          render = <Blog {...props} />;
          break;
      }
      break;
    case 'article':
      switch (name) {
        default:
          render = <Detail {...props} />;
          break;
      }
      break;
    case '404':
      render = <NotFound />;
      break;
  }
  return render;
};

const Routes = (props: any) => {
  const { loading } = props;
  return (
    <>
      <Spin tip="加载中..." spinning={loading}>
        <Login />
        <DrawerSettings />
        {renderPage(props)}
      </Spin>
    </>
  );
};

Routes.getInitialProps = (async (ctx: any) => {
  const { history = {}, match = {} } = ctx;
  const { location = {} } = history;
  const { query = {} } = location;
  const { url: pathname = '/' } = match;
  let { token = '' } = query;

  if (isBrowser()) {
    if (token === '') {
      token = localStorage.getItem('token');
    }
  }
  // 检验token
  const { store } = ctx;

  const { dispatch } = store;

  let routes: any = [
    {
      full_url: '/',
      url: '/',
      pattern: 1,
      name: 'index',
      type: 'index',
    },
    {
      full_url: '/list/:id',
      url: '/list/:id',
      pattern: 2,
      type: 1,
    },
  ];

  let httpStatus: any = {
    status: 200,
    code: 0,
  };
  const routeRes = await getRoutes();
  if (routeRes.code === 0) {
    httpStatus.code = 0;
    httpStatus.msg = routeRes.msg;
  } else {
    const { data = [] } = routeRes;
    const routeCategory: any = [];
    const routeDetail: any = [];

    data.map((item: any) => {
      routeCategory.push({
        ...item,
        pattern: 1, // 精确匹配
        full_url: `/${item.full_url}`,
        url: `/${item.url}`,
      });

      routeDetail.push({
        full_url: `/${item.url}/post/:id`,
        url: `/${item.url}/post/:id`,
        pattern: 2,
        type: 3,
      });
    });
    routes = [...routes, ...routeCategory, ...routeDetail];
  }

  const regData: any = await regPage(routes, pathname, { query, dispatch });

  const { type = '', name = '', params } = regData;

  // 请求接口，获取不同的数据

  // 获取当前页面模板数据
  let fileData = {};
  if (name !== '404') {
    const fileRes = await getThemeFile({ theme: THEME, file: name });
    if (fileRes.code === 1) {
      fileData = { ...fileRes.data.more_json, id: fileRes.data.id };
    }
  }

  await dispatch({
    type: 'global/saveState',
    payload: {
      httpStatus,
      token,
      type,
      name,
      routes,
      fileData,
    },
  });

  return store.getState();
}) as IGetInitialProps;

export default connect(({ global, loading }: any) => ({
  global,
  loading: loading.global,
}))(Routes);
