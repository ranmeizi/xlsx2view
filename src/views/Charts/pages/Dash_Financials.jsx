import React, { Component } from 'react'
import Echarts from '../../../components/charts/Echarts'

const legend = [
  {
    name: 'Bundle',
    value: (data) => JSON.parse(data['lr_promotions']).Bundle.sum
  },
  {
    name: 'EB "Full Price"',
    value: (data) => data.total_tics_income - (JSON.parse(data['lr_promotions']).total.sum)
  },
  {
    name: 'EB Promos',
    value: (data) => JSON.parse(data['lr_promotions']).total.sum
  },
  {
    name: 'LBL card tics',
    value: (data) => data.income_lbl_card_tics
  },
  {
    name: 'Other tics',
    value: (data) => data.income_other_tics
  },
  {
    name: 'Groups',
    value: (data) => data.income_groups_tickets
  },
  {
    name: 'Total Merch/Food/Extras',
    value: (data) => data.income_merch_other_none_group_packages
  }
]

export default class Dash_Financials extends Component {
  mapper(statData) {
    return  {
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: legend.map(item=>item.name)
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
      <div>
        <Echarts type='Dash_Financials' mapper={this.mapper}/>
      </div>
    )
  }
}
