import React, { Component } from 'react'
import Echarts from '../../../components/charts/Echarts'

const legend = [
  {
    name: 'Season Tics/Comps',
    value: (data) => data.season_tics_comps
  },
  {
    name: 'Bundle',
    value: (data) => JSON.parse(data['lr_promotions']).Bundle.count
  },
  {
    name: '"Full" Price',
    value: (data) => data.tickers_sold - JSON.parse(data['lr_promotions']).total.count
  },
  {
    name: 'Promos',
    value: (data) => JSON.parse(data['lr_promotions']).total.count
  },
  {
    name: 'Groups Total',
    value: (data) => data.total_adults_groups + data.tot_child_groups
  },
  {
    name: 'Total Scanned',
    value: (data) => data.tickets_scanned
  }
]

export default class Dash_Attendance extends Component {
  mapper(statData) {
    return  {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: legend.map(item => item.name)
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
      series: legend.map(item => {
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

  render() {
    return (
      <div className='ChartView'>
        <Echarts type='Dash_Attendance' mapper={this.mapper}/>
      </div>
    )
  }
}
