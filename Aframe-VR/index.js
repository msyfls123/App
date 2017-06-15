const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config.babel.js')

const compiler = webpack(config)
const DEVELOP = process.env.NODE_ENV !== 'product'

const app = express()

if (DEVELOP) {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: 'normal'
  }))
  app.use(webpackHotMiddleware(compiler))
} else {
  app.use('/dist', express.static('dist'))
}

app.listen(23333, function(result) {
    console.log("OK")
})
