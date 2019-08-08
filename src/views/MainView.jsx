import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import logo from '../logo.svg';
import Header from '../components/header/Header';
import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

const { Sider, Content } = Layout;

class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }
  menuOnchange = ({ key }) => {
    this.props.history.push(key);
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
            <Menu.Item key="/homepage">
              <Icon type="contacts" />
              <span>Homepage</span>
            </Menu.Item>
            <Menu.Item key="/input">
              <Icon type="file-excel" />
              <span>ImportData</span>
            </Menu.Item>
            <Menu.Item key="/query">
              <Icon type="area-chart" />
              <span>QueryData</span>
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
export default withRouter(MainView);
