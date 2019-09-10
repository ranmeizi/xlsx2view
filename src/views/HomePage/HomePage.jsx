import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Dataset from '../Charts/pages/Income_ticket_dataset'

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
    return <div><Dataset /></div>;
  }
}
export default withRouter(HomePage);
