import configureStore from './configureStore'
import { persistStore } from 'redux-persist'
const store = configureStore()
let persistor = persistStore(store)
export {
  store,
  persistor
}