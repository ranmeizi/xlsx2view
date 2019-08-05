import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import logo from '../logo.svg';
import './MainView.css';
import Header from '../components/header/Header';
import { connect } from "react-redux";
import { Provider } from 'react-keep-alive';
import { HashRouter as Router, Switch } from 'react-router-dom';
import RouterView from '../routes';

const { Sider, Content } = Layout;

export default class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    };
  }

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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>Homepage</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
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
          <Content>
            <Provider>
                <Router>
                  <Switch>{RouterView}</Switch>
                </Router>
            </Provider>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
