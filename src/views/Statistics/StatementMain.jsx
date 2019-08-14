import React, { Component } from 'react'
import { Card } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as tabpanes from '../../redux/actions/tabpanes'

const gridStyle = {
  height: '300px',
  width: '33%',
  textAlign: 'center',
};

class StatementMain extends Component {
  onClick = ({name,path}) => {
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
  addTabList: bindActionCreators(tabpanes.addTabList, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(StatementMain)