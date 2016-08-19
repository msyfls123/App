import React, { Component } from 'react'
import { Provider } from 'react-redux'
import App from "../components/App"
import { store } from "../store/store.js"
import configureStore from '../store/configureStore'
import AsyncApp from './AsyncApp'

const storeReddit = configureStore()

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

class Reddit extends Component {
  render() {
    return (
      <Provider store={storeReddit}>
        <AsyncApp />
      </Provider>
    )
  }
}

export {
  Root,
  Reddit
}
