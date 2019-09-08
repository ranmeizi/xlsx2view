import React from 'react';
import MainView from '../views/MainView';
import HomePage from '../views/HomePage/HomePage';
import DataInput from '../views/DataInput/DataInput';
import TestQuery from '../views/Query/testQuery/TestQuery';
import StatisticsMain from '../views/Statistics/StatementMain';
import StatisticsDetail from '../views/Statistics/Detail/StatisticsDetail';
import TestLine from '../views/Statistics/testLine/TestLine';
import ChartsMain from '../views/Charts/ChartsMain';
import { store } from '../redux/store';
import { KeepAlive } from 'react-keep-alive';
// 图表
import DashFinancials from '../views/Charts/pages/Dash_Financials';
import DashAttendance from '../views/Charts/pages/Dash_Attendance';
import DashTicketTypes from '../views/Charts/pages/Dash_TicketTypes';
import DashPricingTiers from '../views/Charts/pages/Dash_PricingTiers';
import Sellticket from '../views/Charts/pages/Sell_ticket';
import Incometicket from '../views/Charts/pages/Income_ticket';
import Incometicketdataset from '../views/Charts/pages/Income_ticket_dataset';
import IncomeCartesian from '../views/Charts/pages/Income_Cartesian';
console.log('sss',DashFinancials)

const routes = [
  {
    path: '/',
    component: MainView,
    routes: [
      {
        path: '/homepage',
        component: HomePage
      },
      {
        path: '/query',
        component: TestQuery
      },
      {
        path: '/input',
        component: DataInput,
        render: props => {
          // 对比上次操作前的panes数组，看看需不需要缓存页面
          let alive = !store
            .getState()
            .tabpanes.lastPanes.some(
              item => item.key === props.location.pathname
            );
          return (
            <KeepAlive name={props.location.pathname} disabled={alive}>
              <DataInput />
            </KeepAlive>
          );
        }
      },
      // 统计
      {
        path: '/statement',
        exact: true,
        component: StatisticsMain
      },
      {
        path: '/statement/stat-detail/:batch',
        component: StatisticsDetail
      },
      {
        path: '/statement/testline',
        unmount: true,
        component: TestLine
      },
      // 图表
      {
        path: '/charts',
        exact: true,
        component: ChartsMain
      },
      {
        path: '/Dash-Financials',
        exact: true,
        render: (props) => {
          // 对比上次操作前的panes数组，看看需不需要缓存页面
          let alive =!store.getState().tabpanes.lastPanes.some(item => item.key === props.location.pathname)
          return (
            <KeepAlive name={props.location.pathname} disabled={alive}>
              <DashFinancials />
            </KeepAlive>
          )
        }
      },
      {
        path: '/Dash-Attendance',
        exact: true,
        render: props => {
          // 对比上次操作前的panes数组，看看需不需要缓存页面
          let alive = !store
            .getState()
            .tabpanes.lastPanes.some(
              item => item.key === props.location.pathname
            );
          return (
            <KeepAlive name={props.location.pathname} disabled={alive}>
              <DashAttendance />
            </KeepAlive>
          );
        }
      },
      {
        path: '/Dash-TicketTypes',
        exact: true,
        render: props => {
          // 对比上次操作前的panes数组，看看需不需要缓存页面
          let alive = !store
            .getState()
            .tabpanes.lastPanes.some(
              item => item.key === props.location.pathname
            );
          return (
            <KeepAlive name={props.location.pathname} disabled={alive}>
              <DashTicketTypes />
            </KeepAlive>
          );
        }
      },
      {
        path: '/Dash-PricingTiers',
        exact: true,
        render: props => {
          // 对比上次操作前的panes数组，看看需不需要缓存页面
          let alive = !store
            .getState()
            .tabpanes.lastPanes.some(
              item => item.key === props.location.pathname
            );
          return (
            <KeepAlive name={props.location.pathname} disabled={alive}>
              <DashPricingTiers />
            </KeepAlive>
          );
        }
      },
      {
        path: '/cust-selticket',
        exact: true,
        render: props => {
          // 对比上次操作前的panes数组，看看需不需要缓存页面
          let alive = !store
            .getState()
            .tabpanes.lastPanes.some(
              item => item.key === props.location.pathname
            );
          return (
            <KeepAlive name={props.location.pathname} disabled={alive}>
              <Sellticket />
            </KeepAlive>
          );
        }
      },
      {
        path: '/cust-incticket',
        exact: true,
        render: props => {
          // 对比上次操作前的panes数组，看看需不需要缓存页面
          let alive = !store
            .getState()
            .tabpanes.lastPanes.some(
              item => item.key === props.location.pathname
            );
          return (
            <KeepAlive name={props.location.pathname} disabled={alive}>
              <Incometicket />
            </KeepAlive>
          );
        }
      },
      {
        path: '/cust-incticketDS',
        exact: true,
        render: props => {
          // 对比上次操作前的panes数组，看看需不需要缓存页面
          let alive = !store
            .getState()
            .tabpanes.lastPanes.some(
              item => item.key === props.location.pathname
            );
          return (
            <KeepAlive name={props.location.pathname} disabled={alive}>
              <Incometicketdataset />
            </KeepAlive>
          );
        }
      },
      {
        path: '/cust-incCartesian',
        exact: true,
        render: props => {
          // 对比上次操作前的panes数组，看看需不需要缓存页面
          let alive = !store
            .getState()
            .tabpanes.lastPanes.some(
              item => item.key === props.location.pathname
            );
          return (
            <KeepAlive name={props.location.pathname} disabled={alive}>
              <IncomeCartesian />
            </KeepAlive>
          );
        }
      }
    ]
  }
];

export default routes;
