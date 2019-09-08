import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appReducer from './app';
import tabpanes from './tabpanes';
import charts from './charts';

let rootReducer = combineReducers({
  appReducer,
  tabpanes,
  charts
});

export default persistReducer(
  {
    key: 'root',
    storage
  },
  rootReducer
);
