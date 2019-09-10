import React, { Component } from 'react'
import Echarts from '../../../components/charts/Echarts'
import moment from 'moment'
const legend1 = [
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
const legend2 = [
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
export default class Income_ticket_dataset extends Component {

  mapper(statData) {
    statData.result.sort((a, b) => moment(a.game_date) - moment(b.game_date))
    console.log([
      ['game_date'].concat(statData.result.map(item => moment(item.game_date).format('ll'))),
      ...legend1.map(item => {
        return [item.name].concat(statData.result.map(sItem => item.value(sItem)))
      })
    ])
    return {
      legend: {},
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      dataset: {
        source: [
          ['game_date'].concat(statData.result.map(item => moment(item.game_date).format('ll'))),
          ...legend1.map(item => {
            return [item.name].concat(statData.result.map(sItem => item.value(sItem)))
          })
        ]
      },
      xAxis: { type: 'category' },
      yAxis: { gridIndex: 0 },
      grid: { top: '55%' },
      series: [
        ...legend1.map(item => ({ type: 'line', smooth: true, seriesLayoutBy: 'row' })),
        {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '25%'],
          label: {
            formatter: '{b}: £{@2012} ({d}%)'
          },
          encode: {
            itemName: 'game_date',
            value: '2012',
            tooltip: '2012'
          }
        }
      ]
    };
  }
  render() {
    return (
      <div className='ChartView'>
        <Echarts type='Income_ticket_dataset' mapper={this.mapper} onDataSet={
          (component) => {
            component.myCharts.on('updateAxisPointer', (event) => {
              var xAxisInfo = event.axesInfo[0];
              if (xAxisInfo) {
                var dimension = xAxisInfo.value + 1;
                component.myCharts.setOption({
                  series: {
                    id: 'pie',
                    label: {
                      formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                    },
                    encode: {
                      value: dimension,
                      tooltip: dimension
                    }
                  }
                });
              }
            });
          }
        } />
      </div>
    )
  }
}