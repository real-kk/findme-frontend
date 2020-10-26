import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'

const enhancers = []
const middleware = [thunk]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

export default () => {
  const store = createStore(rootReducer, composedEnhancers)
  return store
}