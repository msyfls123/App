import { createStore } from 'redux'
import todoApp from '../reducers/reducer'

let store = createStore(todoApp, window.STATE_FROM_SERVER && window.devToolsExtension && window.devToolsExtension());

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

export {
  store as store
}
