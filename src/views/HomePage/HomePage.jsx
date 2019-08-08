import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class HomePage extends Component {
  componentWillMount() {
    console.log('我是home，我要mount了');
  }
  componentDidMount() {
    console.log('我是home，我mount了');
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }
  componentWillUnmount() {
    console.log('不管用啊');
  }
  render() {
    return <div>我是一个主页</div>;
  }
}
export default withRouter(HomePage);
