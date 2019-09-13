import React, { Component } from 'react'
import { Descriptions, Tooltip } from 'antd'
import API from '../../../api/service'

// 单场统计图
import SellTicket from '../../Charts/pages/Sell_ticket'
import IncomeTicker from '../../Charts/pages/Income_ticket'

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
      describe: {}
    }
  }
  componentWillMount() {
    // 请求详情接口获取数据
    this.getDetail()
  }
  getDetail() {
    const { batch } = this.props.match.params
    API.searchDetail({ batch }).then(res => {
      if (res.data.success) {
        const { detail, describe, DetailGroup } = res.data.data
        this.setState({ statData: detail, describe, DetailGroup })
      }
    })
  }
  render() {
    const { statData, DetailGroup, describe } = this.state
    console.log(this.props.match.params.batch)
    return (
      <div className='shadow-card' style={{ margin: '25px' }}>
        {
          Object.entries(DetailGroup).map(([key, value]) => {
            return <Descriptions title={value.label} bordered column={4}>
              {
                Object.entries(statData).filter(([K, V]) => describe[K].group === key).map(([K, V]) => {
                  return <Descriptions.Item label={<Tooltip title={describe[K].label} style={{}}>
                    <div style={{ width: '120px', overflow: 'hidden', textAlign: 'end', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{describe[K].label}</div>
                  </Tooltip>}>{
                      <Tooltip title={V}>
                        <div style={{
                          width: '80px', overflow: 'hidden', textAlign: 'end', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                          backgroundColor: bgType[describe[K].type]
                        }}>{V}</div>
                      </Tooltip>
                    }</Descriptions.Item>
                })
              }
            </Descriptions>
          })
        }

        {
          Object.keys(statData).length ? <SellTicket data={statData} /> : null
        }
        <IncomeTicker batchs={[this.props.match.params.batch]} />
      </div>
    )
  }
}
