import React, { Component } from 'react'
import Echarts from '../../../components/charts/Echarts'

const legend1 = [
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
const legend2 = [
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
export default class Sell_ticket extends Component {
    mapper1(statData) {
        let data = statData.result[0] || this.props.data
        return {
            title: {},
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: legend1.map(item => item.name)
            },
            series: [
                {
                    name: 'Promotions Statistics',
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '60%'],
                    data: legend1.map(item => {
                        return {
                            name: item.name,
                            value: item.value(data)
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
    mapper2(statData) {
        let data = statData.result[0]
        console.log(data)
        return {
            title: {},
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: legend2.map(item => item.name)
            },
            series: [
                {
                    name: 'TicketType Statistics',
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '60%'],
                    data: legend2.map(item => {
                        return {
                            name: item.name,
                            value: item.value(data)
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
                <div className='flex-row'>
                    <Echarts {...chartStyle} type='Sell_ticket' mapper={this.mapper1} />
                    <Echarts {...chartStyle} type='Sell_ticket' mapper={this.mapper2} />
                </div>
            </div>
        )
    }
}
const chartStyle = {
    width: 700,
    height: 400
}