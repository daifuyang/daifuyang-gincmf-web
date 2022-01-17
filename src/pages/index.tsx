import { useState } from 'react';
import { Card, Col, Row, Button } from 'antd';
import classnames from 'classnames';
import { AndroidOutlined } from '@ant-design/icons';
import styles from './index.less';

const Index = (props: any) => {
  return (
    <main>
      <div className={styles.homeBanner}>
        <div className={styles.homeBannerBackground}>
          <svg viewBox="0 0 1440 448">
            <g transform="translate(380, 30)" opacity="1">
              <g transform="matrix(1, 0, 0, 1, 0, 0)">
                <g transform="rotate(0, 170, 170)">
                  <svg>
                    <defs>
                      <filter id="banner-circle-shadow-1">
                        <feDropShadow
                          dx="10"
                          dy="10"
                          stdDeviation="10"
                          floodColor="rgba(0,0,0,0.05)"
                        ></feDropShadow>
                      </filter>
                      <linearGradient
                        id="banner-circle-fill-1"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: '#FAFCFE' }}
                        ></stop>
                        <stop
                          offset="100%"
                          style={{ stopColor: '#F9FCFE' }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <circle
                      cx="170"
                      cy="170"
                      r="140"
                      fill="url(#banner-circle-fill-1)"
                      filter="url(#banner-circle-shadow-1)"
                    ></circle>
                  </svg>
                </g>
              </g>
            </g>
            <g transform="translate(-230, 218)" opacity="1">
              <g transform="matrix(1, 0, 0, 1, 0, 0)">
                <g transform="rotate(0, 230, 230)">
                  <svg>
                    <defs>
                      <filter id="banner-circle-shadow-2">
                        <feDropShadow
                          dx="10"
                          dy="10"
                          stdDeviation="10"
                          floodColor="rgba(0,0,0,0.05)"
                        ></feDropShadow>
                      </filter>
                      <linearGradient
                        id="banner-circle-fill-2"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          style={{ stopColor: '#FAFCFE' }}
                        ></stop>
                        <stop
                          offset="50%"
                          style={{ stopColor: '#F3F9FC' }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <circle
                      cx="230"
                      cy="230"
                      r="200"
                      fill="url(#banner-circle-fill-2)"
                      filter="url(#banner-circle-shadow-2)"
                    ></circle>
                  </svg>
                </g>
              </g>
            </g>
            <g transform="translate(1280, 180)" opacity="1">
              <g transform="matrix(1, 0, 0, 1, 0, 0)">
                <g transform="rotate(0, 120, 120)">
                  <svg>
                    <defs>
                      <filter id="banner-rect-shadow-1">
                        <feDropShadow
                          dx="10"
                          dy="10"
                          stdDeviation="10"
                          floodColor="rgba(0,0,0,0.05)"
                        ></feDropShadow>
                      </filter>
                      <linearGradient
                        id="banner-rect-fill-1"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="25%"
                          style={{ stopColor: '#F8FCFF' }}
                        ></stop>
                        <stop
                          offset="100%"
                          style={{ stopColor: '#F8FBFF' }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <rect
                      x="30"
                      y="30"
                      width="180"
                      height="180"
                      fill="url(#banner-rect-fill-1)"
                      filter="url(#banner-rect-shadow-1)"
                    ></rect>
                  </svg>
                </g>
              </g>
            </g>
            <g transform="translate(670, -660)" opacity="1">
              <g transform="matrix(1, 0, 0, 1, 0, 0)">
                <g transform="rotate(0, 430, 430)">
                  <svg width="860" height="860">
                    <defs>
                      <filter id="banner-diamond-shadow-1">
                        <feDropShadow
                          dx="10"
                          dy="10"
                          stdDeviation="10"
                          floodColor="rgba(0,0,0,0.05)"
                        ></feDropShadow>
                      </filter>
                      <linearGradient
                        id="banner-diamond-fill-1"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <stop
                          offset="60%"
                          style={{ stopColor: '#FCFDFF' }}
                        ></stop>
                        <stop
                          offset="100%"
                          style={{ stopColor: '#FCFDFE' }}
                        ></stop>
                      </linearGradient>
                    </defs>
                    <path
                      d="M 30 430 430 30 830 430 430 830 Z"
                      fill="url(#banner-diamond-fill-1)"
                      filter="url(#banner-diamond-shadow-1)"
                    ></path>
                  </svg>
                </g>
              </g>
            </g>
          </svg>
        </div>

        <div className={styles.homeBannerHolder}>
          <div className={styles.title}>GinCMF</div>
          <div className={styles.desc}>
            一款基于GIN框架的开源内容管理框架，支持微服务，让WEB开发更快
          </div>
          <div className={styles.btnGroup}>
            <Button
              style={{ marginRight: '15px' }}
              type="primary"
              shape="round"
              size="large"
            >
              快速上手
            </Button>
            <Button type="primary" shape="round" size="large" ghost>
              在线演示
            </Button>
          </div>
        </div>
      </div>
      <div className={classnames(styles.session, styles.feature)}>
        <Row gutter={16}>
          {[1, 1, 1, 1, 1, 1].map((item, i) => {
            return (
              <Col key={i} span={8}>
                <div className={styles.item}>
                  <div className={styles.icon}>
                    <AndroidOutlined />
                  </div>
                  <div className={styles.title}>可扩展性</div>
                  <div className={styles.desc}>
                    Umi 实现了完整的生命周期，并使其插件化，Umi
                    内部功能也全由插件完成。此外还支持插件和插件集，以满足功能和垂直域的分层需求。
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>

      <div className={classnames(styles.session, styles.platform)}>
        <div className={styles.title}>兼容多平台</div>
        <Row className={styles.row} gutter={0}>
          {[1, 1, 1, 1].map((_, i) => (
            <Col key={i} span={6}>
              <div className={classnames(styles.item, 'item')}>
                <Card hoverable>
                  <div className={styles.title}>开源免费无加密</div>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </main>
  );
};
export default Index;
