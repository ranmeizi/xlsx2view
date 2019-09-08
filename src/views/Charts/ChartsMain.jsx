import React, { Component } from 'react'
import API from '../../api/service'
import { Card, Select, Row, Col, Statistic, Empty, message } from 'antd';
import * as tabpanes from '../../redux/actions/tabpanes'
import * as charts from '../../redux/actions/charts'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

const { Option } = Select;
const gridStyle = {
  height: '250px',
  width: '25%',
  textAlign: 'center',
};
class ChartsMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      batchs: [],
      allOfBatchs: [] //批次数组
    }
  }
  onClick = ({ name, path }) => {
    // 如果是没有batch条件提示，退出
    if (this.state.batchs.length === 0) {
      message.warn('Please select at least one match.')
      return
    }
    // 把这些batch号存到name名下的数组中
    this.props.set_batch(name, this.state.batchs)

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
    this.getAllOfBatchs()
  }
  getAllOfBatchs = () => {
    API.getAllOfBatchs().then(res => {
      if (res.data.success) {
        this.setState({
          allOfBatchs: res.data.data
        })
      }
    })
  }
  handleChange = (value) => {
    this.setState({ batchs: value })
  }
  render() {
    return (
      <div>
        {/* 选择数据 */}
        <div className='shadow-card'>
          Choose a batch
            <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Please select"
            defaultValue={[]}
            onChange={this.handleChange}
          >
            {
              this.state.allOfBatchs.map(item => <Option key={item.batch}>{item.opposition}</Option>)
            }
          </Select>
        </div>
        {/* 卡片展示 */}
        <Card title="Dash-Charts" className='StatementMain'>
          <Card.Grid onClick={() => this.onClick({ name: 'Dash_Financials', path: `/Dash-Financials` })} style={gridStyle}>
            <img src="./images/linetest.png" alt="" />
            <h3>Dash_Financials</h3>
          </Card.Grid>
          <Card.Grid onClick={() => this.onClick({ name: 'Dash_Attendance', path: `/Dash-Attendance` })} style={gridStyle}>
            <img src="./images/linetest.png" alt="" />
            <h3>Dash_Attendance</h3>
          </Card.Grid>
          <Card.Grid onClick={() => this.onClick({ name: 'Dash_TicketTypes', path: `/Dash-TicketTypes` })} style={gridStyle}>
            <img src="./images/compound.jpg" alt="" />
            <h3>Dash_TicketTypes</h3>
          </Card.Grid>
          <Card.Grid onClick={() => this.onClick({ name: 'Dash_PricingTiers', path: `/Dash-PricingTiers` })} style={gridStyle}>
            <img src="./images/compound.jpg" alt="" />
            <h3>Dash_PricingTiers</h3>
          </Card.Grid>
        </Card>
        <Card title="Custom-Charts" className='StatementMain'>
          <Card.Grid onClick={() => this.onClick({ name: 'Sell_ticket', path: `/cust-selticket` })} style={gridStyle}>
            <img src="./images/pietest.jpg" alt="" />
            <h3>Sell_ticket</h3>
          </Card.Grid>
          <Card.Grid onClick={() => this.onClick({ name: 'Income_ticket', path: `/cust-incticket` })} style={gridStyle}>
            <img src="./images/nestPie.jpg" alt="" />
            <h3>Income_ticket</h3>
          </Card.Grid>
          <Card.Grid onClick={() => this.onClick({ name: 'Income_ticket_dataset', path: `/cust-incticketDS` })} style={gridStyle}>
            <img src="./images/sharedataset.jpg" alt="" />
            <h3>Income_ticket_dataset</h3>
          </Card.Grid>
          <Card.Grid onClick={() => this.onClick({ name: 'Income_Cartesian', path: `/cust-incCartesian` })} style={gridStyle}>
            <img src="./images/heatmap-cartesian.jpg" alt="" />
            <h3>Income_Cartesian</h3>
          </Card.Grid>
        </Card>
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
  cachePanes: bindActionCreators(tabpanes.cachePanes, dispatch),
  set_batch: bindActionCreators(charts.set_batch, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(ChartsMain)
