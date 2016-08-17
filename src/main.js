document.write("<div id='app'></div><div id='root'></div>")
require("./css/index.scss")
var dataHtml = require("./html/app.html")
document.getElementById('app').innerHTML = dataHtml

import { store } from "./store/store.js"
import { addTodo,completeTodo,setVisibilityFilter,VisibilityFilters} from "./action/actions"
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from "./components/App"

console.log(Provider)

let rootElement = document.getElementById('root')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
