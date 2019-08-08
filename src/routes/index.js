import React from 'react';
import MainView from '../views/MainView';
import HomePage from '../views/HomePage/HomePage';
import DataInput from '../views/DataInput/DataInput';
import { KeepAlive } from 'react-keep-alive';

const routes = [
  {
    path: '/',
    component: MainView,
    routes: [
      {
        path: '/homepage',
        component: () => (
          <KeepAlive name="HomePage">
            <HomePage />
          </KeepAlive>
        )
      },
      {
        path: '/query',
        component: () => (
          <KeepAlive name="HomePage">
            <HomePage />
          </KeepAlive>
        )
      },
      {
        path: '/input',
        component: () => (
          <KeepAlive name="DataInput">
            <DataInput />
          </KeepAlive>
        )
      }
    ]
  }
];

export default routes;
