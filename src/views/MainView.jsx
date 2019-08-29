import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import logo from '../logo.svg';
import Header from '../components/header/Header';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
// import { renderRoutes } from '../routes/react-router-config'
import { bindActionCreators } from 'redux'
import * as tabpanes from '../redux/actions/tabpanes'

const { Sider, Content } = Layout;

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }
  menuOnchange = ({ item, key }) => {
    // 先缓存操作前的panes数组
    this.props.cachePanes()
    // panes进行增减操作
    this.props.addTabList({
      key: key,
      title: item.props.name,
      closable: true
    })
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  render() {
    return (
      <Layout className="MainView">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div>
            <img src={logo} className="App-logo" alt="" />
            <div className="logo" />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['/homepage']}
            onClick={this.menuOnchange}
          >
            <Menu.Item key="/homepage" name='Homepage'>
              <Icon type="contacts" />
              <span>Homepage</span>
            </Menu.Item>
            <Menu.Item key="/input" name='ImportData'>
              <Icon type="file-excel" />
              <span>ImportData</span>
            </Menu.Item>
            <Menu.Item key="/query" name='QueryData'>
              <Icon type="area-chart" />
              <span>QueryData</span>
            </Menu.Item>
            <Menu.Item key="/statement" name='Statement'>
              <Icon type="area-chart" />
              <span>Statement</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content>{renderRoutes(this.props.route.routes)}</Content>
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = (state, ownnProps) => ({
  rdx_menuData: state.tabpanes.menuData,
  rdx_activeKey: state.tabpanes.activeKey
})
const mapDispatchToProps = dispatch => ({
  addTabList: bindActionCreators(tabpanes.addTabList, dispatch),
  cachePanes: bindActionCreators(tabpanes.cachePanes, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainView));
