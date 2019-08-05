import React from 'react';
import HomePage from '../views/HomePage/HomePage';
import DataInput from '../views/DataInput/DataInput';
import { renderRoutes } from 'react-router-config';
import { KeepAlive } from 'react-keep-alive';

const routes = [
  {
    path: '/homepage',
    component: () => (
      <KeepAlive name='HomePage'>
        <HomePage />
      </KeepAlive>
    )
  },
  {
    path: '/input',
    component: () => (
      <KeepAlive name='DataInput'>
        <DataInput />
      </KeepAlive>
    )
  }
];

export default renderRoutes(routes);
