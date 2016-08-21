document.write("<div id='app'></div><div id='root'></div><div id='app2'></div>")
require("./css/index.scss")
var dataHtml = require("./html/app.html")
document.getElementById('app').innerHTML = dataHtml

import 'babel-polyfill'
import fetch from 'isomorphic-fetch'

fetch(`/api/rank.json`)
  .then(response => response.json())
  .then(json => document.getElementById('app2').innerHTML = JSON.stringify(json) )
  .catch(function(error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    document.getElementById('app2').innerHTML = JSON.stringify(error)
  })

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, Link } from 'react-router';
import { Root, Reddit } from "./components/Root"
import View from "./components/View"
import About from "./components/About"
import Repos from "./components/Repos"


let rootElement = document.getElementById('root')
render(
  <Router history={browserHistory}>
   <Route component={View}>
    <Route path="/" component={Root}/>
    <Route path="/repos(/:name)" component={Repos}/>
    <Route path="/about" component={Reddit}/>
    </Route>
  </Router>,
  rootElement
)
