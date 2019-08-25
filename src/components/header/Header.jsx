import React, { Component } from 'react';
import { Tabs, Row, Col } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as tabpanes from '../../redux/actions/tabpanes'
const { TabPane } = Tabs;

class Header extends Component {
  onChange = (activeKey) => {
    this.props.setActiveKey(activeKey)
  }
  onEdit = (targetKey, action) => {
    if (action === 'remove') {
      this.props.removeTabList(targetKey)
    }
  }
  render() {
    console.log('panes')
    console.log(this.props.rdx_panes)
    return (
      <Row>
        <Col span={1}>{this.props.children}</Col>
        <Col span={23}>
          <Tabs
            activeKey={this.props.rdx_activeKey}
            tabPosition='top'
            type="editable-card"
            onChange={this.onChange}
            onEdit={this.onEdit}>
            {this.props.rdx_panes.map(item => (
              <TabPane tab={`${item.title}`} key={item.key} closable={item.closable} />
            ))}
          </Tabs>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state, ownnProps) => ({
  rdx_panes: state.tabpanes.panes,
  rdx_activeKey: state.tabpanes.activeKey
})
const mapDispatchToProps = dispatch => ({
  removeTabList: bindActionCreators(tabpanes.removeTabList, dispatch),
  clearTabList: bindActionCreators(tabpanes.clearTabList, dispatch),
  setActiveKey: bindActionCreators(tabpanes.setActiveKey, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
