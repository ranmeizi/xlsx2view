import React, { Component } from 'react'
import { Card, Row, Col, Statistic, Pagination, Empty } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import API from '../../api/service'
import * as tabpanes from '../../redux/actions/tabpanes'
import moment from 'moment'

const gridStyle = {
  height: '250px',
  width: '25%',
  textAlign: 'center',
};

class StatementMain extends Component {
  state = {
    current: 1,
    rptList: [],
    total: 0
  }
  onClick = ({ name, path }) => {
    // 先缓存操作前的panes数组
    this.props.cachePanes()
    // panes进行增减操作
    this.props.addTabList({
      key: path,
      title: name,
      closable: true
    })
  }
  componentWillMount() {
    // 获取列表
    this.getRptList()
  }
  getRptList = () => {
    API.getRptList({ current: this.state.current }).then(res => {
      if (res.data.success) {
        this.setState({
          rptList: res.data.data.list,
          total: res.data.data.count
        })
      }
    })
  }
  empty = () =>
    <Card.Grid style={gridStyle}>
      <Row><Empty /></Row>
    </Card.Grid>

  render() {
    const { rptList, total } = this.state
    let length = rptList.length
    // 数组补齐
    for (let i = length; i < 12; i++) {
      rptList.push(false)
    }
    return (
      <div>
        <Card title="Card Title" className='StatementMain'>
          {
            rptList.map(item => item ? <Card.Grid onClick={() => this.onClick({ name: item.opposition, path: `/statement/${item.batch}` })} style={gridStyle}>
              <Row>
                <Col><h2>{item.opposition}</h2></Col>
                <Col span={12}>
                  <Statistic title="Total Tickets(E'brite)" value={item.total_tickets_ebrite} />
                </Col>
                <Col span={12}>
                  <Statistic title="Total Tics Income" value={item.total_tics_income + '£'} />
                </Col>
                <Col span={12}>
                  <Statistic title="Game Day" value={moment(item.game_date).format('ll')} />
                </Col>
                <Col span={12}>
                  <Statistic title="Total Income" value={item.total_income_tics_merch_other + '£'} />
                </Col>
              </Row>
            </Card.Grid>
              : this.empty())
          }
        </Card>
        <Pagination current={this.state.current} total={total} />
      </div>
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(StatementMain)