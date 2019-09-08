import React, { Component } from 'react'
import Echarts from '../../../components/charts/Echarts'

export default class Sell_ticket extends Component {
    componentWillMount(){
        // 获取数据
    }
    mapper(statData) {
        let data = {}
        statData.result.forEach(item => {
            data[item.opposition] = item.total_merch_other_income
        })
        return {
            title: {},
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: statData.oppositions
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: statData.oppositions.map(item => {
                        return {
                            name: item,
                            value: data[item]
                        }
                    }),
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    }

    render() {
        return (
            <div className='ChartView'>
                <Echarts type='Sell_ticket' mapper={this.mapper} />
            </div>
        )
    }
}
