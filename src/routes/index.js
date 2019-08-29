import React from 'react';
import MainView from '../views/MainView';
import HomePage from '../views/HomePage/HomePage';
import DataInput from '../views/DataInput/DataInput';
import TestQuery from '../views/Query/testQuery/TestQuery';
import StatisticsMain from '../views/Statistics/StatementMain';
import TestLine from '../views/Statistics/testLine/TestLine';
import { store } from '../redux/store';
import { KeepAlive } from 'react-keep-alive';

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
        render: (props) => {
          // 对比上次操作前的panes数组，看看需不需要缓存页面
          let alive =!store.getState().tabpanes.lastPanes.some(item => item.key === props.location.pathname)
          return (
            <KeepAlive name={props.location.pathname} disabled={alive}>
              <DataInput />
            </KeepAlive>
          )
        }
      },
      {
        path: '/statement',
        exact: true,
        component: StatisticsMain
      },
      {
        path: '/statement/testline',
        unmount: true,
        component: TestLine
      }
    ]
  }
];

export default routes;
