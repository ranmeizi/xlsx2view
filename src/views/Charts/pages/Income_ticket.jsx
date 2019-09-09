import React, { Component } from 'react'
import Echarts from '../../../components/charts/Echarts'
import API from '../../../api/service'
import { store } from '../../../redux/store'

const { getState } = store

export default class Income_ticket extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ticket_type: [],
            price_tier: []
        }
    }
    componentWillMount() {
        // 获取数据
        // 去store中取对应的数组
        const batchs = getState().charts['Income_ticket'] || this.props.batchs
        API.getSingleField({
            statTable: 'Income_ticket',
            batch: batchs[0]
        }).then(res => {
            if (res.data.success) {
                const { ticket_type, price_tier } = res.data.data
                this.setState({ ticket_type, price_tier })
            }
        })
    }
    mapper = (statData) => {
        const { ticket_type, price_tier } = this.state
        return {
            tooltip: {
                trigger: 'item',
                // formatter: "{a} <br/>{b}: {c} ({d}%)"
                formatter: (arg1) => {
                    return `${arg1.seriesName} <br/>${arg1.name}: ${arg1.value} (${arg1.percent}%) <br/>£${arg1.data.income}`
                }
            },
            legend: {
                orient: 'horizontal',
                x: 'left',
                data: ticket_type.map(item => item.ticket_type).concat(['']).concat(price_tier.map(item => item.price_tier))
            },
            series: [
                {
                    name: 'Price Tier',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],
                    center: ['50%', '50%'],
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
                    data: price_tier.map(item => {
                        return {
                            name: item.price_tier,
                            value: item.cnt,
                            income: item.sum
                        }
                    })
                },
                {
                    name: 'Ticket Type',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    center: ['50%', '50%'],
                    // label: {
                    //     normal: {
                    //         formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                    //         backgroundColor: '#eee',
                    //         borderColor: '#aaa',
                    //         borderWidth: 1,
                    //         borderRadius: 4,
                    //         rich: {
                    //             a: {
                    //                 color: '#999',
                    //                 lineHeight: 22,
                    //                 align: 'center'
                    //             },
                    //             hr: {
                    //                 borderColor: '#aaa',
                    //                 width: '100%',
                    //                 borderWidth: 0.5,
                    //                 height: 0
                    //             },
                    //             b: {
                    //                 fontSize: 16,
                    //                 lineHeight: 33
                    //             },
                    //             per: {
                    //                 color: '#eee',
                    //                 backgroundColor: '#334455',
                    //                 padding: [2, 4],
                    //                 borderRadius: 2
                    //             }
                    //         }
                    //     }
                    // },
                    data: ticket_type.map(item => {
                        return {
                            name: item.ticket_type,
                            value: item.cnt,
                            income: item.sum
                        }
                    })
                },
            ]
        };
    }

    render() {
        return (
            <div className='ChartView'>
                {
                    this.state.ticket_type.length > 0 && this.state.price_tier.length > 0 ?
                        <Echarts type='Income_ticket' mapper={this.mapper} />
                        : null
                }
            </div>
        )
    }
}
