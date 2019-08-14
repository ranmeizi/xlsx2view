import React, { Component } from 'react'
import API from '../../../api/service'
import echarts from 'echarts'

export default class TestLine extends Component {
  componentDidMount() {
    API.getTestLineS().then(res => {
      option.legend.data = res.data.yAxis
      option.yAxis.data = res.data.legend
      Object.entries(res.data.yArr).forEach((item, index) => {
        option.series[index] = {
          name: item[0],
          type: 'bar',
          stack: 'total',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: item[1]
        }
      })
      var dom = document.getElementById("container1");
      let myChart = echarts.init(dom);
      myChart.setOption(option, true);
    })
  }
  render() {
    return (
      <div>
        <div id='container1' style={{ height: '800px', width: '1200px' }}></div>
      </div>
    )
  }
}
let option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  series: [
    {
      name: '直接访问',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: '邮件营销',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '联盟广告',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '视频广告',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: '搜索引擎',
      type: 'bar',
      stack: '总量',
      label: {
        normal: {
          show: true,
          position: 'insideRight'
        }
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
  ]
};