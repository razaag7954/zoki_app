import { combineReducers } from 'redux'
import { user } from 'redux/Slices/User'

const rootReducer = combineReducers({
  user
})

export { rootReducer }
