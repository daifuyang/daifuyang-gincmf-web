import React, { useState, useEffect } from 'react';
import { SettingsIcon } from '@/pages/components/drawerSettings';
import { Card, Col, Row, Button } from 'antd';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import Parallax from 'rc-scroll-anim/lib/ScrollParallax';
import classnames from 'classnames';

import { connect } from 'dva';
import { getThemeVars, getThemeWidgets, getWidgetsAttr } from '@/utils/common';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import Banner from './public/Banner';
import styles from './index.less';

React.useLayoutEffect = useEffect;

const pointPos = [
  { x: -30, y: -10 },
  { x: 20, y: -20 },
  { x: -65, y: 15 },
  { x: -45, y: 80 },
  { x: 35, y: 5 },
  { x: 50, y: 50, opacity: 0.2 },
];

const Index = (props: any) => {
  const { global = {} } = props;
  const { token, fileData = {}, name } = global;

  const themeWidgets = getThemeWidgets(fileData);
  const { banner = {}, feature = {}, canDo = {} } = themeWidgets;
  const [hoverNum, setHoverNum] = useState<any>(-1);
  const [init, setInit] = useState(false);

  console.log('canDo', canDo);

  useEffect(() => {
    setInit(true);
  }, []);

  const features = (data: []) => {
    let children: any = [];
    data.forEach((item: any, i) => {
      const isHover = hoverNum === i;
      const pointChild = [
        'point-0 left',
        'point-0 right',
        'point-ring',
        'point-1',
        'point-2',
        'point-3',
      ].map((className) => (
        <TweenOne
          component="i"
          className={className}
          key={className}
          style={{
            background: item.color,
            borderColor: item.color,
          }}
        />
      ));

      const child = (
        <li key={i.toString()}>
          <div
            className={styles.box}
            onMouseEnter={() => {
              onMouseOver(i);
            }}
            onMouseLeave={onMouseOut}
          >
            <TweenOneGroup
              className={styles.pointWrapper}
              enter={getEnter}
              leave={{
                x: 0,
                y: 30,
                opacity: 0,
                duration: 300,
                ease: 'easeInBack',
              }}
              exclusive={true}
            >
              {isHover && pointChild}
            </TweenOneGroup>

            <div
              className={styles.image}
              style={{
                boxShadow: `${isHover ? '0 12px 24px' : '0 6px 12px'} ${
                  item.shadowColor
                }`,
              }}
            >
              <img src={item.src} alt="img" />
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        </li>
      );

      if (!children[Math.floor(i / 3)]) {
        children[Math.floor(i / 3)] = [];
      }
      children[Math.floor(i / 3)].push(child);
    });

    children = children.map((item: any, i: number) => {
      return (
        <QueueAnim
          key={i.toString()}
          className={styles.wrapper}
          type="bottom"
          leaveReverse
          delay={[i * 100, (children.length - 1 - i) * 100]}
          component="ul"
        >
          {item}
        </QueueAnim>
      );
    });

    return children;
  };

  const onMouseOver = (i: number) => {
    setHoverNum(i);
  };

  const onMouseOut = () => {
    setHoverNum(-1);
  };

  const getEnter = (e: any) => {
    const i = e.index;
    const r = Math.random() * 2 - 1;
    const y = Math.random() * 10 + 5;
    const delay = Math.round(Math.random() * (i * 50));
    return [
      {
        delay,
        opacity: 0.4,
        ...pointPos[e.index],
        ease: 'easeOutBack',
        duration: 300,
      },
      {
        y: r > 0 ? `+=${y}` : `-=${y}`,
        duration: Math.random() * 1000 + 2000,
        yoyo: true,
        repeat: -1,
      },
    ];
  };

  return (
    <main>
      {/* banner */}
      {banner.display > 0 && (
        <div className={styles.homeBanner}>
          <div className={styles.settingsWrap}>
            <SettingsIcon
              style={{ marginTop: '100px' }}
              file={fileData.file}
              moreType="widgets"
              vars="banner"
            />
          </div>

          <div className={styles.homeBannerBackground}>
            <Banner />
          </div>

          <div className={styles.homeBannerHolder}>
            <div className={styles.title}>
              {getWidgetsAttr(banner, 'title') || 'GinCMF'}
            </div>
            <div className={styles.desc}>
              {getWidgetsAttr(banner, 'sub_title') || ''}
            </div>
            <div className={styles.btnGroup}>
              <Button
                style={{ marginRight: '15px' }}
                type="primary"
                shape="round"
                size="large"
                href={getWidgetsAttr(banner, 'btn_primary', 'href')}
                target={getWidgetsAttr(banner, 'btn_primary', 'target')}
              >
                {getWidgetsAttr(banner, 'btn_primary') || '快速上手'}
              </Button>
              <Button
                type="primary"
                shape="round"
                size="large"
                ghost
                href={getWidgetsAttr(banner, 'btn_primary', 'href')}
                target={getWidgetsAttr(banner, 'btn_primary', 'target')}
              >
                {getWidgetsAttr(banner, 'btn_ghost') || '在线演示'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 特色 */}
      {feature.display > 0 && (
        <div
          className={classnames(styles.session, styles.feature)}
          id="feature-wrapper"
        >
          <div className={styles.settingsWrap}>
            <SettingsIcon
              file={fileData.file}
              moreType="widgets"
              vars="feature"
            />
          </div>

          <Parallax
            className={styles.bg}
            animation={{
              translateY: 200,
              ease: 'linear',
              playScale: [0, 1.65],
            }}
            location="feature-wrapper"
          >
            {getWidgetsAttr(feature, 'parallax')}
          </Parallax>

          <h2>平台特色</h2>
          <div className={styles.titleLineWrapper}>
            <div className={styles.titleLine} />
          </div>
          <OverPack playScale={0.1}>
            {features(getWidgetsAttr(feature, 'grid'))}
          </OverPack>
        </div>
      )}

      {/* canDo */}
      {canDo.display > 0 && (
        <div className={classnames(styles.session, styles.platform)}>
          <div className={styles.settingsWrap}>
            <SettingsIcon
              file={fileData.file}
              moreType="widgets"
              vars="canDo"
            />
          </div>

          <h2> {getWidgetsAttr(canDo, 'grid', 'title') || 'GINCMF能做什么'}</h2>
          <div className={styles.titleLineWrapper}>
            <div className={styles.titleLine} />
          </div>

          <Row className={styles.row} gutter={0}>
            {getWidgetsAttr(canDo, 'grid')?.map((item: any, i: number) => (
              <Col style={{ width: '20%', maxWidth: '20%' }} key={i} flex={1}>
                <div className={classnames(styles.item, 'item')}>
                  <Card hoverable>
                    <div className={styles.title}>{item.title}</div>
                    {/* <div className={styles.desc}>开源免费无加密</div> */}
                  </Card>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </main>
  );
};

export default connect(({ global }: any) => ({
  global,
}))(Index);
