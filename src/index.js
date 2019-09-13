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

// 检查store中的pane数组，如果没有跳转初始页面
const { getState } = store
const hash = window.location.hash.replace('#', '')
const panes = store.getState().tabpanes.panes
if (!panes.some(item => item.key === hash)) {
  window.open('#' + panes[0].key, '_self')
}

ReactDOM.render(
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
    <KkpProvider>
      <App />
    </KkpProvider>
    {/* </PersistGate> */}
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
