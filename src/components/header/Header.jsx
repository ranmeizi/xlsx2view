import React, { Component } from 'react';
import { Tabs, Row, Col } from 'antd';
const { TabPane } = Tabs;

export default class Header extends Component {
  render() {
    return (
      <Row>
        <Col span={1}>{this.props.children}</Col>
        <Col span={23}>
          <Tabs defaultActiveKey="1" tabPosition="top" style={{ height: 220 }}>
            {[...Array(30).keys()].map(i => (
              <TabPane tab={`Tab-${i}`} key={i}>
                Content of tab {i}
              </TabPane>
            ))}
          </Tabs>
        </Col>
      </Row>
    );
  }
}
