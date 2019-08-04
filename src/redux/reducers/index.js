import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appReducer from './app';
import tabpanesReducer from './tabpanes';

let rootReducer = combineReducers({
  appReducer,
  tabpanesReducer
});

export default persistReducer(
  {
    key: 'root',
    storage
  },
  rootReducer
);
