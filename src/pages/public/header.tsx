import classNames from 'classnames';
import styles from './header.less';
import { connect } from 'dva';
import { SettingsIcon } from '@/pages/components/drawerSettings';
import { Link } from 'umi';
import { getThemeVars, getThemeWidgets } from '@/utils/common';

const Header = (props: any) => {
  const { global = {} } = props;
  const { token, headerData = {} } = global;
  const themeVars = getThemeVars(headerData);
  const themeWidgets = getThemeWidgets(headerData);
  const navs = themeWidgets?.navs?.vars;

  return (
    <header className={classNames(styles.header)}>
      {token && <SettingsIcon />}
      <div className={styles.row}>
        <div className={styles.col}>
          <h1>
            <Link to="/" id={styles.logo}>{themeVars.logo}</Link>
          </h1>
        </div>
        <div
          style={{ flex: '1 1 auto' }}
          className={classNames(styles.col, styles.menuRow)}
        >
          <ul className={styles.menu}>
            {navs?.main?.map((item: any, i: number) => (
              <li key={i} className={styles.menuItem}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default connect(({ global }: any) => ({
  global,
}))(Header);
