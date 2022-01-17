import { Drawer, Card, Upload, message } from 'antd';
import { connect } from 'dva';
import styles from './drawerSettings.less';
import { SettingOutlined } from '@ant-design/icons';

const VarsRender: any = (props: any) => {
  const { themeVars } = props;
  return Object.keys(themeVars).map((key: string, index: number) => {
    const item = themeVars[key];
    let render = null;
    const { value } = item;
    switch (item.type) {
      case 'image':
        render = <h1>img</h1>;
        break;
    }
    return (
      <Card key={index} title={item.title}>
        {render}
      </Card>
    );
  });
};

const drawerSettings: any = (props: any) => {
  const { global = {}, dispatch } = props;
  const { visible = false } = global;
  const { headerData = {} } = global;
  const themeVars = headerData.more.vars;
  const onClose = () => {
    dispatch({
      type: 'global/toggerVisable',
    });
  };
  return (
    <Drawer
      width={320}
      title={headerData.description}
      placement={'right'}
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      <h4>设置</h4>

      <VarsRender themeVars={themeVars} />

      <h4>组件</h4>

      <Card title="Default size card" extra={<a href="#">More</a>}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Drawer>
  );
};
export default connect(({ global }: any) => ({
  global,
}))(drawerSettings);

export const SettingsIcon = connect(({ global }: any) => ({
  global,
}))((props: any) => {
  const { dispatch } = props;
  return (
    <div
      onClick={() => {
        dispatch({
          type: 'global/toggerVisable',
        });
      }}
      className="settings-wrap"
    >
      <SettingOutlined />
    </div>
  );
});
