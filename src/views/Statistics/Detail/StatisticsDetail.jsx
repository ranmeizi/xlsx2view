import React, { Component } from 'react'
import { Descriptions, Tooltip, Switch, Select, Icon } from 'antd'
import API from '../../../api/service'
import './StatisticsDetail.css'

// 单场统计图
import SellTicket from '../../Charts/pages/Sell_ticket'
import IncomeTicker from '../../Charts/pages/Income_ticket'
import moment from 'moment'

const { Option } = Select
const bgType = [
  'rgb(208,206,206)', //原始数据
  'rgb(0,176,240)', //统计数据
  'rgb(146,208,80)', //公式数据
  '#', //增长
  '#', //下降
]

export default class StatisticsDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statData: {},
      DetailGroup: {},
      describe: {},
      allOfBatchs: [],
      isComparison: false, //控制开启对比功能
      comparStatData: {},
      comparBatch: ''
    }
  }
  componentWillMount() {
    // 请求详情接口获取数据
    this.getDetail()
    this.getComparList()
  }
  getDetail = () => {
    const { batch } = this.props.match.params
    API.searchDetail({ batch }).then(res => {
      if (res.data.success) {
        const { detail, describe, DetailGroup } = res.data.data
        this.setState({ statData: detail, describe, DetailGroup })
      }
    })
  }
  getComparDetail = () => {
    const batch = this.state.comparBatch
    if (batch) {
      API.searchDetail({ batch }).then(res => {
        if (res.data.success) {
          this.setState({ comparStatData: res.data.data })
        }
      })
    }
  }
  // 获取比较list
  getComparList() {
    API.getAllOfBatchs().then(res => {
      if (res.data.success) {
        this.setState({
          allOfBatchs: res.data.data
        })
      }
    })
  }
  onSwitchChange = () => {
    this.setState({
      isComparison: !this.state.isComparison
    })
  }
  handleSelectChange = (value) => {
    this.setState({ comparBatch: value }, () => {
      // 获取对比数据
      this.getComparDetail()
    })
  }
  render() {
    const { statData, comparStatData, DetailGroup, describe, isComparison, comparBatch } = this.state
    return (
      <div className='shadow-card' style={{ margin: '25px' }}>
        <div className='flex-row justify-between'>
          <h2>Single field statistics</h2>
          {/* 开启对比？ */}
          <div>
            <div className='flex-row align-center'>
              <h3>Comparison?&nbsp;&nbsp;</h3><Switch checked={isComparison} onChange={this.onSwitchChange} />
              <Select style={{ width: 300 }} onChange={this.handleSelectChange} value={comparBatch}>
                {
                  // 去掉自己的batch
                  this.state.allOfBatchs.filter(item => item.batch !== this.props.match.params.batch).map(item => <Option key={item.batch}>
                    {/* 左边对阵。右边日期 */}
                    <div className='flex-row justify-between'>
                      <span>{item.opposition}</span>
                      <span>{moment(item.game_date).format('ll')}</span>
                    </div>
                  </Option>)
                }
              </Select>
            </div>
          </div>
        </div>

        {
          Object.entries(DetailGroup).map(([key, value]) => {
            return <Descriptions title={value.label} bordered column={4} >
              {
                Object.entries(statData).filter(([K, V]) => describe[K].group === key).map(([K, V]) => {
                  return <Descriptions.Item style={{ padding: 0 }} label={<Tooltip title={describe[K].label} className='shiyishi'>
                    <div style={{ width: '120px', overflow: 'hidden', textAlign: 'end', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{describe[K].label}</div>
                  </Tooltip>}>{
                      <Tooltip title={V}>
                        <div className='bg-item' style={{ backgroundColor: bgType[describe[K].type] }}>
                          <span>{describe[K].prefix}</span>{V}<span>{describe[K].suffix}</span>
                          {/* 以下是对比数据 */}
                          {
                            // 添加动画类
                            this.state.isComparison && comparStatData.detail ? <div className={`comparStatData ${this.state.isComparison ? 'onRight' : ''}`}>
                              <span>{describe[K].prefix}</span>{comparStatData.detail[K]}<span>{describe[K].suffix}</span>
                            </div>
                              : null
                          }
                          {/* 在加一个增长比 */}
                          {
                            this.state.isComparison && comparStatData.detail && String(comparStatData.detail[K]).match(/^[\d\.]+$/g) ? <div className={`comparStatData ${this.state.isComparison ? 'onLeft' : ''}`}>
                              <div className='flex-row justify-center' style={{ color: V - comparStatData.detail[K] > 0 ? 'red' : 'green' }}>
                                {/* icon */}
                                {V - comparStatData.detail[K] > 0 ? <Icon style={{ lineHeight: 'inherit' }} type="rise" /> : <Icon type="fall" style={{ lineHeight: 'inherit' }} />}
                                <span>{describe[K].prefix}</span>{(V - comparStatData.detail[K]).toFixed(2)}<span>{describe[K].suffix}</span>
                              </div>
                            </div>
                              : null
                          }
                        </div>
                      </Tooltip>
                    }</Descriptions.Item>
                })
              }
            </Descriptions>
          })
        }
        <h2>Income Pie</h2>
        {
          Object.keys(statData).length ? <SellTicket data={statData} /> : null
        }
        <h2>Income Type/Tire</h2>
        <IncomeTicker batchs={[this.props.match.params.batch]} />
      </div>
    )
  }
}