import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './reducers'
import storage from './presistStorage'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {}

// presist the state of user after refreshing the app.
const persistConfig = {
  key: `PresistStorage`, // variable name in storage
  storage,
  whitelist: [
    `user`
  ], // which reducer want to store
}
const persistReducerState = persistReducer(persistConfig, rootReducer)
const middleware = [thunk]
const store = createStore(
  persistReducerState,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
)

const persistor = persistStore(store)
export { store, persistor }
