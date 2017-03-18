const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const cssExtractor = new ExtractTextPlugin("css/lib.[contenthash:9].css")
const stylExtractor = new ExtractTextPlugin("css/main.[contenthash:9].css")

const ROOT_PATH = path.resolve(__dirname)
const SRC_PATH = path.resolve(ROOT_PATH, 'src')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')
const TMPL_PATH = path.resolve(SRC_PATH, 'tmpl')
const DEVELOP = process.env.NODE_ENV !== 'product'
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'

module.exports = {
  entry: {
    main: [hotMiddlewareScript, path.resolve(SRC_PATH, 'main')]
  },
  output: {
    path: DIST_PATH,
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    publicPath: '/'
  },
  module: {
    loaders:[
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.styl$/,
        loader: stylExtractor.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!stylus-loader',
          publicPath: '../'
        })
      },
      {
        test:/\.css$/,
        loader: cssExtractor.extract({
          fallbackLoader:'style-loader',
          loader: 'css-loader',
          publicPath: '../'
        })
      },
      {
        test:/\.(png|jpg|gif)$/,
        loader:'url-loader?limit=8192&name=img/[name].[ext]?[hash]'
      },
      {
        test:/\.(eot|svg|ttf|TTF|woff)$/,
        loader:'url-loader?limit=1000&name=font/[name].[ext]?[hash]'
      }
    ]
  },
  resolve: {
    alias: {
      component: path.resolve(SRC_PATH, 'component'),
      css: path.resolve(SRC_PATH, 'css')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(DEVELOP ? 'dev'
                                       : 'production')
    }),
    new CleanPlugin(['dist'], {
      root: ROOT_PATH,
      verbose: true,
      dry: true
    }),
    new CopyPlugin([{
      from: path.join(SRC_PATH, 'model'),
      to: 'model',
      ignore: ['**/.DS_Store']
    }]),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: DEVELOP,
      minimum: !DEVELOP,
      compress: {
        warnings: false
      }
    }),
    new HtmlwebpackPlugin({
      title: 'webpack demo',
      template: path.resolve(TMPL_PATH, 'index.pug'),
      filename: 'index.html',
      chunks: ['main'],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      title: 'webpack demo',
      template: path.resolve(TMPL_PATH, 'p1.pug'),
      filename: 'p1.html',
      chunks: [],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      title: 'webpack demo',
      template: path.resolve(TMPL_PATH, 'p2.pug'),
      filename: 'p2.html',
      chunks: [],
      inject: 'body'
    }),
    new HtmlwebpackPlugin({
      title: 'webpack demo',
      template: path.resolve(TMPL_PATH, 'p3.pug'),
      filename: 'p3.html',
      chunks: [],
      inject: 'body'
    }),
    cssExtractor,
    stylExtractor,
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    hot: false,
    stats: 'normal'
  },
  devtool: DEVELOP ? 'source-map' : false
}
