import { createStore } from 'redux'
import todoApp from '../reducers/reducer'

let store = createStore(todoApp, window.devToolsExtension && window.devToolsExtension());

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

export {
  store as store
}
