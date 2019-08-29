import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import * as serviceWorker from './serviceWorker';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as KkpProvider } from 'react-keep-alive';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <KkpProvider>
        <App />
      </KkpProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
