import { createStore, applyMiddleware } from 'redux'
import todoApp from '../reducers/reducer'

// middleware
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}

let createStoreWithMiddleware = applyMiddleware(logger, crashReporter)(createStore)
let store = createStoreWithMiddleware(todoApp, window.devToolsExtension && window.devToolsExtension());

// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// );

export {
  store as store
}
