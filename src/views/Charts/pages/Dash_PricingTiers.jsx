import React, { Component } from 'react'
import Echarts from '../../../components/charts/Echarts'

// 票统计
const legend1 = [
  {
    name: 'Early Bird',
    value: (data) => data.early_bird_tics
  },
  {
    name: 'Advance',
    value: (data) => data.advance_tics
  },
  {
    name: 'Gameday',
    value: (data) => data.gameday_tics
  },
  {
    name: 'Other',
    value: (data) => data.other_tics
  }
]
// 票比例
const legend2 = [
  {
    name: 'Early Bird',
    value: (data) => data.inc_early_bird
  },
  {
    name: 'Advance',
    value: (data) => data.inc_advance
  },
  {
    name: 'Gameday',
    value: (data) => data.inc_gameday
  },
  {
    name: 'Other',
    value: (data) => data.inc_other
  }
]
// 票收入统计
const legend3 = [
  {
    name: '% Early Bird',
    value: (data) => (data.early_bird_tics/(data.early_bird_tics+data.advance_tics+data.gameday_tics)).toFixed(2)
  },
  {
    name: '% Advance',
    value: (data) => (data.advance_tics/(data.early_bird_tics+data.advance_tics+data.gameday_tics)).toFixed(2)
  },
  {
    name: '% Gameday',
    value: (data) => (data.gameday_tics/(data.early_bird_tics+data.advance_tics+data.gameday_tics)).toFixed(2)
  }
]
// 票收入比例
const legend4 = [
  {
    name: '% Early Bird',
    value: (data) => (data.inc_early_bird/(data.inc_early_bird+data.inc_advance+data.inc_gameday)).toFixed(2)
  },
  {
    name: '% Advance',
    value: (data) =>  (data.inc_advance/(data.inc_early_bird+data.inc_advance+data.inc_gameday)).toFixed(2)
  },
  {
    name: '% Gameday',
    value: (data) =>  (data.inc_gameday/(data.inc_early_bird+data.inc_advance+data.inc_gameday)).toFixed(2)
  }
]

export default class Dash_PricingTiers extends Component {
  mapper1(statData) {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: legend1.map(item => item.name)
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category',
        data: statData.oppositions
      },
      series: legend1.map(item => {
        return {
          name: item.name,
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: statData.result.map(stat => {
            return item.value(stat)
          })
        }
      })
    };
  }
  mapper2(statData) {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: legend2.map(item => item.name)
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category',
        data: statData.oppositions
      },
      series: legend2.map(item => {
        return {
          name: item.name,
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: statData.result.map(stat => {
            return item.value(stat)
          })
        }
      })
    };
  }
  mapper3(statData) {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      legend: {
        data: legend3.map(item => item.name)
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: statData.oppositions
      },
      series: legend3.map(item => {
        return {
          name: item.name,
          type: 'line',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          areaStyle: { normal: {} },
          data: statData.result.map(stat => {
            return item.value(stat)
          })
        }
      })
    };
  }
  mapper4(statData) {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      legend: {
        data: legend4.map(item => item.name)
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      yAxis: {
        type: 'value'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: statData.oppositions
      },
      series: legend4.map(item => {
        return {
          name: item.name,
          type: 'line',
          stack: '总量',
          areaStyle: {},
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: statData.result.map(stat => {
            return item.value(stat)
          })
        }
      })
    };
  }

  render() {
    return (
      <div>
        <div className='flex-row justify-around'>
          <Echarts {...chartStyle} type='Dash_PricingTiers' mapper={this.mapper1} />
          <Echarts {...chartStyle} type='Dash_PricingTiers' mapper={this.mapper2} />
        </div>
        <div className='flex-row justify-around'>
          <Echarts {...chartStyle} type='Dash_PricingTiers' mapper={this.mapper3} />
          <Echarts {...chartStyle} type='Dash_PricingTiers' mapper={this.mapper4} />
        </div>
      </div>
    )
  }
}
const chartStyle = {
  width: 700,
  height: 400
}
