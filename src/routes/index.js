// import React from 'react';
import MainView from '../views/MainView';
import HomePage from '../views/HomePage/HomePage';
import DataInput from '../views/DataInput/DataInput';
import TestQuery from "../views/Query/testQuery/TestQuery";

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
      }
    ]
  }
];

export default routes;
