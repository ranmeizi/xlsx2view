import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Dataset from '../Charts/pages/Income_ticket_dataset'
import API from '../../api/service'
import * as charts from '../../redux/actions/charts'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

class HomePage extends Component {
  state = {
    ok: false
  }
  componentWillMount() {
    API.getAllOfBatchs().then(res => {
      if (res.data.success) {
        const batchList = res.data.data.map(item => item.batch)
        // 把这些batch号存到name名下的数组中
        this.props.set_batch('Income_ticket_dataset', batchList)
        this.setState({ ok: true })
      }
    })
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
    return this.state.ok ? <div><Dataset /></div> : null;
  }
}
const mapStateToProps = (state, ownnProps) => ({
})
const mapDispatchToProps = dispatch => ({
  set_batch: bindActionCreators(charts.set_batch, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
