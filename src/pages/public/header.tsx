import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './header.less';
import { connect } from 'dva';
import { SettingsIcon } from '@/pages/components/drawerSettings';
import { Link } from 'umi';
import { Button, Dropdown, Menu, Spin } from 'antd';
import MyAvatar from '../components/Avatar';
import {
  getThemeVars,
  getThemeWidgets,
  getWidgetsAttr,
  getVarsAttr,
} from '@/utils/common';

import { isBrowser } from 'umi';

const Header = (props: any) => {
  const {
    global = {},
    user = {},
    themeFiles = {},
    dispatch,
    headerData,
    loading,
    history
  } = props;

  useEffect(() => {
    dispatch({
      type: 'user/fetchUser',
    });
  }, []);

  const { location = {} }: any = history;
  const pathname = location.pathname;
  const themeVars = getThemeVars(headerData);
  const themeWidgets = getThemeWidgets(headerData);
  const { navs = {} } = themeWidgets;

  const showLogin = () => {
    dispatch({
      type: 'global/saveState',
      payload: {
        loginVisible: true,
      },
    });
  };

  const renderUser = () => {
    if (user.id > 0) {
      const menu = (
        <Menu>
          <Menu.Item key="profile">
            <Link
              className={styles.loginMenuItem}
              to={'/user/settings/profile'}
            >
              个人中心
            </Link>
          </Menu.Item>
          <Menu.Item key="signIn">
            <a
              className={styles.loginMenuItem}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              签到有礼
            </a>
          </Menu.Item>
          <Menu.Item key="account">
            <a
              className={styles.loginMenuItem}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              账号设置
            </a>
          </Menu.Item>
          <Menu.Item key="signOut">
            <a
              className={styles.loginMenuItem}
              onClick={() => {
                dispatch({
                  type: 'global/signOut',
                });
              }}
            >
              退出登录
            </a>
          </Menu.Item>
        </Menu>
      );

      return (
        <div className={styles.loginInfo}>
          <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <div>
              <MyAvatar avatar={user.avatar_prev} nickname={user.user_nickname} />
              <span className={styles.nickname}>{user.user_login}</span>
            </div>
          </Dropdown>
        </div>
      );
    }

    return (
      <Button onClick={showLogin} type="primary" ghost>
        登录
      </Button>
    );
  };

  return (
    <header
      id="header"
      style={{ position: 'absolute' }}
      className={classNames(styles.header)}
    >
      {/* <Spin tip="" spinning={loading}></Spin> */}
      <SettingsIcon file={headerData.file} settingType="header" />
      <div className={styles.row}>
        <div className={styles.col}>
          <h1>
            <Link to="/" id={styles.logo}>
              {getVarsAttr(themeVars, 'logo')}
            </Link>
          </h1>
        </div>
        <div
          style={{ flex: '1 1 auto' }}
          className={classNames(styles.col, styles.menuRow)}
        >
          {}

          {themeWidgets?.navs?.display > 0 && (
            <ul className={styles.menu}>
              {getWidgetsAttr(navs, 'main')?.map((item: any, i: number) => {
                const patt = item.href;
                let active = false;
                if (patt === '/') {
                  active = pathname === patt;
                } else {
                  active = pathname.indexOf(patt) > -1;
                }

                return (
                  <li
                    key={i}
                    data-href={item.href}
                    className={classNames(
                      styles.menuItem,
                      active ? styles.active : '',
                    )}
                  >
                    <Link target={item.target} to={item.href || '/'}>
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className={styles.login}>{renderUser()}</div>
      </div>
    </header>
  );
};

export default connect(({ global, user, loading, themeFiles }: any) => ({
  global,
  user: user.data,
  headerData: themeFiles.headerData,
  footerData: themeFiles.footerData,
  loading: loading.global,
}))(Header);
