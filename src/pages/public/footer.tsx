import React from 'react';
import { Row, Col, Button } from 'antd';

import styles from './footer.less';

function Footer() {
  return (
    <footer id="footer" className={styles.dark}>
      <div className={styles.footerWrap}>
        <Row className={styles.footerRow}>
          <Col lg={6} sm={24} xs={24}>
            <div className={styles.footerCenter}>
              <h2>友情链接</h2>
              <div>
                <a
                  target="_blank "
                  href="https://github.com/ant-design/ant-design-pro"
                >
                  语音工具箱
                </a>
              </div>
              <div>
                <a target="_blank " href="http://ant.design">
                  thinkcmf
                </a>
              </div>
              <div>
                <a href="http://mobile.ant.design">码上点</a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className={styles.footerCenter}>
              <h2>导航</h2>
              <div>
                <a href="http://scaffold.ant.design">首页</a>
              </div>
              <div>
                <a
                  target="_blank"
                  rel="noopener"
                  href="http://motion.ant.design"
                >
                  文档
                </a>
              </div>
              <div>
                <a
                  target="_blank"
                  rel="noopener"
                  href="http://library.ant.design/"
                >
                  生态
                </a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="http://ux.ant.design">
                  博客
                </a>
              </div>
              <div>
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://github.com/dvajs/dva"
                >
                  社区
                </a>
              </div>
              <div>
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://github.com/dvajs/dva-cli"
                >
                  案例
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className={styles.footerCenter}>
              <h2>帮助</h2>
              <div>
                <a href="#">更新记录</a>
              </div>
              <div>
                <a href="#">常见问题</a>
              </div>
              <div>
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://gitter.im/ant-design/ant-design-pro"
                >
                  在线讨论
                </a>
              </div>
              <div>
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://github.com/ant-design/ant-design-pro/issues"
                >
                  讨论列表
                </a>
              </div>
              <div>
                <a
                  target="_blank"
                  rel="noopener"
                  href="http://ant.design/docs/resource/work-with-us"
                >
                  加入我们
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} sm={24} xs={24}>
            <div className={styles.footerCenter}>
              <h2>更多产品</h2>
              <div>
                <a target="_blank" rel="noopener" href="http://ant.design/">
                  Ant Design
                </a>
                <span> - </span>
                <span>蚂蚁 UI 设计体系</span>
              </div>
              <div>
                <a
                  target="_blank"
                  rel="noopener"
                  href="https://antv.alipay.com/"
                >
                  AntV
                </a>
                <span> - </span>
                <span>蚂蚁数据可视化方案</span>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="https://eggjs.org/">
                  Egg
                </a>
                <span> - </span>
                <span>企业级 Node Web 开发框架</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Row className={styles.bottomBar}>
        <Col lg={24} sm={24}>
          <span style={{ marginRight: 12 }}>ICP 证浙 B2-2-100257</span>
          <span style={{ marginRight: 12 }}>Copyright © GinCMF Team</span>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
