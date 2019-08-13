import React from 'react';
import './App.css';
import { HashRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { renderRoutes } from './routes/react-router-config' //为了适应cache组件这个renderRouter稍微改了下
function App() {
  return (
    <Router>
        {renderRoutes(Routes)}
    </Router>
  );
}

export default App;
