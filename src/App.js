import React from 'react';
import './App.css';
// import MainView from './views/MainView';
import { HashRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-keep-alive';
import Routes from './routes';
import { renderRoutes } from 'react-router-config';
function App() {
  return (
    <Router>
      <Provider>
        <Switch>{renderRoutes(Routes)}</Switch>
      </Provider>
    </Router>
  );
}

export default App;
