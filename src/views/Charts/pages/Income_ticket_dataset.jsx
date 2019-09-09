import React, { Component } from 'react'
import Echarts from '../../../components/charts/Echarts'
import moment from 'moment'
const legend1 = [
  {
    name: '% Early Bird',
    value: (data) => (data.early_bird_tics / (data.early_bird_tics + data.advance_tics + data.gameday_tics)).toFixed(2)
  },
  {
    name: '% Advance',
    value: (data) => (data.advance_tics / (data.early_bird_tics + data.advance_tics + data.gameday_tics)).toFixed(2)
  },
  {
    name: '% Gameday',
    value: (data) => (data.gameday_tics / (data.early_bird_tics + data.advance_tics + data.gameday_tics)).toFixed(2)
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
    statData.sort((a, b) => moment(a.game_date) - moment(b.game_date))
    return {
      legend: {},
      tooltip: {
        trigger: 'axis',
        showContent: false
      },
      dataset: {
        source: [
          ['game_date'].concat(statData.map(item => item.opposition)),
          ...legend1.map(item => {
            return ['item.name'].concat(statData.map(sItem=>item.value(sItem)))
          })
        ]
      },
      xAxis: { type: 'category' },
      yAxis: { gridIndex: 0 },
      grid: { top: '55%' },
      series: [
        { type: 'line', smooth: true, seriesLayoutBy: 'row' },
        { type: 'line', smooth: true, seriesLayoutBy: 'row' },
        { type: 'line', smooth: true, seriesLayoutBy: 'row' },
        { type: 'line', smooth: true, seriesLayoutBy: 'row' },
        {
          type: 'pie',
          id: 'pie',
          radius: '30%',
          center: ['50%', '25%'],
          label: {
            formatter: '{b}: {@2012} ({d}%)'
          },
          encode: {
            itemName: 'product',
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
        <Echarts type='Sell_ticket' mapper={this.mapper} onDataSet={
          () => {
            this.myChart.on('updateAxisPointer', (event) => {
              var xAxisInfo = event.axesInfo[0];
              if (xAxisInfo) {
                var dimension = xAxisInfo.value + 1;
                this.myChart.setOption({
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