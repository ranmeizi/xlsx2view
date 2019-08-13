// import React from 'react';
import MainView from '../views/MainView';
import HomePage from '../views/HomePage/HomePage';
import DataInput from '../views/DataInput/DataInput';

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
        component: HomePage
      },
      {
        path: '/input',
        component: DataInput
      }
    ]
  }
];

export default routes;
