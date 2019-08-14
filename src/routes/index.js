// import React from 'react';
import MainView from '../views/MainView';
import HomePage from '../views/HomePage/HomePage';
import DataInput from '../views/DataInput/DataInput';
import TestQuery from '../views/Query/testQuery/TestQuery';
import StatisticsMain from '../views/Statistics/StatementMain';
import TestLine from '../views/Statistics/testLine/TestLine';

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
        component: DataInput
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
