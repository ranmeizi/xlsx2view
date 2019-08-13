import React, { Component } from 'react'
import API from '../../../api/service'
import moment from 'moment'
import { Table } from 'antd'

export default class TestQuery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      params: {
        pageSize: 10,
        startTime: '20180101000000',
        endTime: '20190813235600',
        pageNum: 1,
        batchNum: null
      },
      list: [],
      count: 0,
      column: []
    }
  }
  getData = () => {
    API.getList(this.state.params).then(res => {
      if (res.data.success) {

        let { list, count, column } = res.data.data
        list = list.map(item => ({ ...item, key: item.autoid }))
        column = column.map(item => ({ ...item, width: '15%' }))
        console.log(list)
        this.setState({ list, count, column })
      }
    })
  }
  // 翻页
  onChange = async (page, pageSize) => {
    await this.setState({ params: { ...this.state.params, pageNum: page } })
    this.getData()
  }
  componentWillMount() {
    this.getData()
  }
  render() {
    return (
      <div>
        <Table
          columns={this.state.column}
          dataSource={this.state.list}
          scroll={{ x: 1920 }}
          pagination={{
            pageSize: this.state.params.pageSize,
            total: this.state.count,
            current: this.state.params.pageNum,
            onChange: this.onChange
          }}
        />
      </div>
    )
  }
}
