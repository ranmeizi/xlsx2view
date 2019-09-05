import React, { Component } from 'react'
import { Card } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as tabpanes from '../../redux/actions/tabpanes'

const gridStyle = {
  height: '250px',
  width: '25%',
  textAlign: 'center',
};

class StatementMain extends Component {
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
  render() {
    return (
      <div>
        <Card title="Card Title" className='StatementMain'>
          <Card.Grid onClick={() => this.onClick({ name:'testLine',path: '/statement/testline' })} style={gridStyle}><img src='/images/linetest.png' /></Card.Grid>
          <Card.Grid onClick={() => this.onClick('')} style={gridStyle}>TODO</Card.Grid>
          <Card.Grid onClick={() => this.onClick('')} style={gridStyle}>TODO</Card.Grid>
          <Card.Grid onClick={() => this.onClick('')} style={gridStyle}>TODO</Card.Grid>
          <Card.Grid onClick={() => this.onClick('')} style={gridStyle}>TODO</Card.Grid>
          <Card.Grid onClick={() => this.onClick('')} style={gridStyle}>TODO</Card.Grid>
          <Card.Grid onClick={() => this.onClick('')} style={gridStyle}>TODO</Card.Grid>
          <Card.Grid onClick={() => this.onClick('')} style={gridStyle}>TODO</Card.Grid>
          <Card.Grid onClick={() => this.onClick('')} style={gridStyle}>TODO</Card.Grid>
          <Card.Grid onClick={() => this.onClick('')} style={gridStyle}>TODO</Card.Grid>
          <Card.Grid onClick={() => this.onClick('')} style={gridStyle}>TODO</Card.Grid>
          <Card.Grid onClick={() => this.onClick('')} style={gridStyle}>TODO</Card.Grid>
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
  cachePanes: bindActionCreators(tabpanes.cachePanes, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(StatementMain)