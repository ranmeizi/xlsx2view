import React, { Component } from 'react'
import { Descriptions } from 'antd'
import API from '../../../api/service'

export default class StatisticsDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      statData: {}
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
        this.setState({
          statData: res.data.data
        })
      }
    })
  }
  render() {
    const { statData } = this.state
    return (
      <div>
        <Descriptions title="User Info" bordered column={6}> 
          {
             Object.entries(statData).map(([key, value]) => {
              return <Descriptions.Item label={key}>{value}</Descriptions.Item>
            })
          }
        </Descriptions>
      </div>
    )
  }
}
