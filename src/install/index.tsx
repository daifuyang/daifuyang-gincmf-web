import header from '@/pages/public/header.json';
import footer from '@/pages/public/footer.json';
import index from '@/pages/index.json';
import blog from '@/pages/blog.json';

import { connect, history } from 'umi';
import { useEffect } from 'react';
import { Result, Button, Typography, Spin, Skeleton } from 'antd';

const install = (props: any) => {
  const { global = {}, dispatch, loading } = props;
  const { httpStatus = {} } = global;

  useEffect(() => {
    const data = {
      theme: THEME,
      version: VERSION,
      theme_file: [
        JSON.stringify(header),
        JSON.stringify(footer),
        JSON.stringify(index),
        JSON.stringify(blog),
      ],
    };

    dispatch({
      type: 'global/installTheme',
      payload: {
        data,
      },
    });
  }, []);

  const goHome = () => {
    history.push('/');
  };

  const RenderHttpOk = () => {
    let render;

    if (loading) {
      render = <Skeleton active />;
    } else {
      if (httpStatus.status === 200 && httpStatus.code === 1) {
        render = (
          <Result
            status="success"
            title="操作成功"
            subTitle={httpStatus.msg}
            extra={[
              <Button type="primary" onClick={goHome} key="index">
                去首页
              </Button>,
            ]}
          ></Result>
        );
      } else {
        render = (
          <Result
            status="error"
            title="权限错误"
            subTitle={httpStatus.msg}
            extra={[
              <Button type="primary" key="console">
                去后台
              </Button>,
              <Button type="link" onClick={goHome} key="index">
                去首页
              </Button>,
            ]}
          ></Result>
        );
      }
    }

    return <div className="header-top">{render}</div>;
  };

  return (
    <Spin tip="加载中..." spinning={loading}>
      {RenderHttpOk()}
    </Spin>
  );
};

export default connect(({ global, loading }: any) => ({
  global,
  loading: loading.effects['global/installTheme'],
}))(install);
