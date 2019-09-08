import React, { Component } from 'react'
import Echarts from '../../../components/charts/Echarts'

// 票统计
const legend1 = [
  {
    name: 'Adults',
    value: (data) => data.total_adults
  },
  {
    name: 'Concessions',
    value: (data) => data.total_concessions
  },
  {
    name: 'Children',
    value: (data) => data.total_children
  },
  {
    name: 'Family1',
    value: (data) => data.total_family1
  },
  {
    name: 'Family2',
    value: (data) => data.total_family2
  }
]
// 票比例
const legend2 = [
  {
    name: 'Adults',
    value: (data) => data.inc_audults
  },
  {
    name: 'Concessions',
    value: (data) => data.inc_concessions
  },
  {
    name: 'Children',
    value: (data) => data.inc_children
  },
  {
    name: 'Family1',
    value: (data) => data.inc_family1
  },
  {
    name: 'Family2',
    value: (data) => data.inc_family2
  }
]
// 票收入统计
const legend3 = [
  {
    name: '% Adults',
    value: (data) => (data.total_adults / (data.total_adults + data.total_concessions + data.total_children + data.total_family1 + data.total_family2)).toFixed(2)
  },
  {
    name: '% Concessions',
    value: (data) => (data.total_concessions / (data.total_adults + data.total_concessions + data.total_children + data.total_family1 + data.total_family2)).toFixed(2)
  },
  {
    name: '% Children',
    value: (data) => (data.total_children / (data.total_adults + data.total_concessions + data.total_children + data.total_family1 + data.total_family2)).toFixed(2)
  },
  {
    name: '% Family1',
    value: (data) => (data.total_family1 / (data.total_adults + data.total_concessions + data.total_children + data.total_family1 + data.total_family2)).toFixed(2)
  },
  {
    name: '% Family2',
    value: (data) => (data.total_family2 / (data.total_adults + data.total_concessions + data.total_children + data.total_family1 + data.total_family2)).toFixed(2)
  }
]
// 票收入比例
const legend4 = [
  {
    name: '% Adults',
    value: (data) => (data.inc_audults / (data.inc_audults + data.inc_concessions + data.inc_children + data.inc_family1 + data.inc_family2)).toFixed(2)
  },
  {
    name: '% Concessions',
    value: (data) => (data.inc_concessions / (data.inc_audults + data.inc_concessions + data.inc_children + data.inc_family1 + data.inc_family2)).toFixed(2)
  },
  {
    name: '% Children',
    value: (data) => (data.inc_children / (data.inc_audults + data.inc_concessions + data.inc_children + data.inc_family1 + data.inc_family2)).toFixed(2)
  },
  {
    name: '% Family1',
    value: (data) => (data.inc_family1 / (data.inc_audults + data.inc_concessions + data.inc_children + data.inc_family1 + data.inc_family2)).toFixed(2)
  },
  {
    name: '% Family2',
    value: (data) => (data.inc_family2 / (data.inc_audults + data.inc_concessions + data.inc_children + data.inc_family1 + data.inc_family2)).toFixed(2)
  }
]

export default class Dash_TicketTypes extends Component {
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
          <Echarts {...chartStyle} type='Dash_TicketTypes' mapper={this.mapper1} />
          <Echarts {...chartStyle} type='Dash_TicketTypes' mapper={this.mapper2} />
        </div>
        <div className='flex-row justify-around'>
          <Echarts {...chartStyle} type='Dash_TicketTypes' mapper={this.mapper3} />
          <Echarts {...chartStyle} type='Dash_TicketTypes' mapper={this.mapper4} />
        </div>
      </div>
    )
  }
}
const chartStyle = {
  width: 700,
  height: 400
}
