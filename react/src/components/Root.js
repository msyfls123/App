import React, { Component } from 'react'
import { Provider } from 'react-redux'
import App from "../components/App"
import { store } from "../store/store.js"
import configureStore from '../store/configureStore'
import AsyncApp from './AsyncApp'

const initialState2 = {
  selectedSubreddit:"reactjs"
}

const storeReddit = configureStore(initialState2)

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
