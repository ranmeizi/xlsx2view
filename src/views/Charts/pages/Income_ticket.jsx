import React, { Component } from 'react'
import Echarts from '../../../components/charts/Echarts'

export default class Income_ticket extends Component {
    mapper(statData) {
        let data = {}
        statData.result.forEach(item => {
            data[item.opposition] = item.total_merch_other_income
        })
        return {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: []
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],
                    center: ['80%', '50%'],
                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: 335, name: '直达', selected: true },
                        { value: 679, name: '营销广告' },
                        { value: 1548, name: '搜索引擎' }
                    ]
                },
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    center: ['80%', '50%'],
                    label: {
                        normal: {
                            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                            backgroundColor: '#eee',
                            borderColor: '#aaa',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                a: {
                                    color: '#999',
                                    lineHeight: 22,
                                    align: 'center'
                                },
                                hr: {
                                    borderColor: '#aaa',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                b: {
                                    fontSize: 16,
                                    lineHeight: 33
                                },
                                per: {
                                    color: '#eee',
                                    backgroundColor: '#334455',
                                    padding: [2, 4],
                                    borderRadius: 2
                                }
                            }
                        }
                    },
                    data: [
                        { value: 335, name: '直达' },
                        { value: 310, name: '邮件营销' },
                        { value: 234, name: '联盟广告' },
                        { value: 135, name: '视频广告' },
                        { value: 1048, name: '百度' },
                        { value: 251, name: '谷歌' },
                        { value: 147, name: '必应' },
                        { value: 102, name: '其他' }
                    ]
                },
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
