import React, { Component } from 'react'
import PropTypes from 'prop-types';
import echarts from 'echarts'
import { store } from '../../redux/store'
import API from '../../api/service'

const { getState } = store

export default class Echarts extends Component {
  static propTypes = {
    type: PropTypes.string, //图表种类，用来请求数据
    mapper: PropTypes.func, //图表opcion,用于生成echarts的option
    height: PropTypes.number, //高度 默认800
    width: PropTypes.number, //宽度 默认1200
  }
  myCharts = null
  statData = {} //存放数据
  option = {} //echart配置

  getData = () => {
    const { type } = this.props
    // 去store中取对应的数组
    const batchs = getState().charts[type]
    API.getChartData({ batchs }).then(res => {
      if (res.data.success) {
        this.statData = res.data.data
        this.option = this.props.mapper(this.statData)
        this.initChart()
      }
    })
  }
  componentWillMount() {

  }
  async componentDidMount() {
    this.getData()

  }
  initChart = () => {
    this.myCharts = echarts.init(this.refs.chart);
    this.myCharts.setOption(this.option, true);
    // 自定义事件
    if (this.props.onDataSet) {
      this.props.onDataSet(this)
    }
  }



  render() {
    const { width, height } = this.props
    return (
      <div>
        <div ref='chart' style={{ height: `${height || 800}px`, width: `${width || 1200}px` }}></div>
      </div>
    )
  }
}
