import React, { Component } from 'react'
import API from '../../../api/service'
import moment from 'moment'
import { Table, Row, Col, DatePicker, Select, Button, Popconfirm, Icon, message } from 'antd'

const { Option } = Select;

const { RangePicker } = DatePicker;

export default class TestQuery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      params: {
        pageSize: 20,
        startTime: '2018-01-01 00:00:00',
        endTime: '2019-08-13 00:00:00',
        pageNum: 1,
        batchs: []
      },
      list: [],
      count: 0,
      column: [], //表头数组
      allOfBatchs: [] //批次数组
    }
  }
  reset = () => {

  }

  onChange = (value, dateString) => {
    this.setState({
      params: { ...this.state.params, startTime: value[0].format('YYYY-MM-DD HH:mm:ss'), endTime: value[1].format('YYYY-MM-DD HH:mm:ss') }
    })
  }

  getData = () => {
    API.getList(this.state.params).then(res => {
      if (res.data.success) {

        let { list, count, column, batchs } = res.data.data
        list = list.map(item => ({ ...item, key: item.autoid }))
        // column = column.map(item => ({ ...item }))
        this.setState({ list, count, column, allOfBatchs: batchs })
      }
    })
  }
  handleChange = (value) => {
    this.setState({ params: { ...this.state.params, batchs: value } })
  }
  // 翻页
  onPageChange = async (page, pageSize) => {
    await this.setState({ params: { ...this.state.params, pageNum: page } })
    this.getData()
  }
  componentWillMount() {
    this.getData()
  }
  delete = () => {
    API.deleteBatch({ batchs: this.state.params.batchs }).then(res => {
      if (res.data.success) {
        message.success('success')
      }
    })
  }
  render() {
    return (
      <div className='TestQuery'>
        {/* 上面搜索项 */}
        <Row type='flex' justify='center' align='bottom' className='TestQuery-filter shadow-card'>
          {/* 时间选择器 */}
          <Col span={6}>
            Choose a time
            <RangePicker
              showTime={{ format: 'HH:mm:ss' }}
              format="YYYY-MM-DD HH:mm:ss"
              placeholder={['Start Time', 'End Time']}
              onChange={this.onChange}
              onOk={this.onOk}
              value={[moment(this.state.params.startTime), moment(this.state.params.endTime)]}
            />
          </Col>
          {/* 选择批次 */}
          <Col span={6}>
            Choose a batch
            <Select
              mode="multiple"
              style={{ width: '100%', overflow: 'hidden' }}
              placeholder="Please select"
              defaultValue={[]}
              onChange={this.handleChange}
            >
              {
                this.state.allOfBatchs.map(item => <Option key={item}>{item}</Option>)
              }
            </Select>
          </Col>
          {/* 查询 */}
          <Col span={6}> <Button onClick={() => {
            this.setState({
              params: {
                ...this.state.params,
                pageNum: 1,
              },
              list: [],
              count: 0,
              column: [],
              allOfBatchs: []
            }, this.getData)
          }} type="primary" shape="circle" icon="search" /></Col>
          {/* 删除 */}
          <Col>
            <Popconfirm title="The batch you choose will be deleted. Do you want to continue?" okText="Yes" cancelText="No" onConfirm={() => {
              this.delete()
            }}>
              <Icon type="delete" style={{ fontSize: '24px' }} />
            </Popconfirm>
          </Col>
        </Row>
        {/* 下面表格 */}
        <Table
          className='TestQuery-table shadow-card'
          columns={this.state.column}
          dataSource={this.state.list}
          scroll={{ x: 3000 }}
          size='small'
          pagination={{
            pageSize: this.state.params.pageSize,
            total: this.state.count,
            current: this.state.params.pageNum,
            onChange: this.onPageChange
          }}
        />
      </div>
    )
  }
}
