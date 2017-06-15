var path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    HtmlwebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    CleanPlugin = require('clean-webpack-plugin'),
    CopyPlugin = require('copy-webpack-plugin'),
    cssExtractor = new ExtractTextPlugin("css/lib.[contenthash:9].css"),
    stylExtractor = new ExtractTextPlugin("css/main.[contenthash:9].css")

var ROOT_PATH = path.resolve(__dirname),
    APP_PATH = path.resolve(ROOT_PATH, 'src'),
    DIST_PATH = path.resolve(ROOT_PATH, 'dist'),
    TMPL_PATH = path.resolve(APP_PATH, 'tmpl')

module.exports = {
  entry: {
    main: path.resolve(APP_PATH, 'main')
  },
  output: {
    path: DIST_PATH,
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    // publicPath: '/'
  },
  module:{
    loaders:[
      {test:/\.(js|jsx)$/, loader:'babel-loader', exclude:/node_modules/, query:{
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
      }},
      {test:/\.styl$/, loader: stylExtractor.extract({
        fallbackLoader:'style-loader',
        loader: 'css-loader!stylus-loader',
        publicPath: '../'
      })},
      {test:/\.css$/, loader: cssExtractor.extract({
        fallbackLoader:'style-loader',
        loader: 'css-loader',
        publicPath: '../'
      })},
      {test:/\.(png|jpg|gif)$/, loader:'url-loader?limit=8192&name=img/[name].[ext]?[hash]'},
      {test:/\.(eot|svg|ttf|TTF|woff)$/, loader:'url-loader?limit=1000&name=font/[name].[ext]?[hash]'}
    ]
  },
  resolve:{
    alias:{
      components: path.resolve(APP_PATH,'components'),
      utils: path.resolve(APP_PATH, 'utils'),
      css: path.resolve(APP_PATH, 'css')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(
                  process.env.NODE_ENV === 'dev' ? 'dev'
                                                 : 'production')
    }),
    new CleanPlugin(['dist'], {
      root: ROOT_PATH,
      verbose: true,
      dry: true
    }),
    new CopyPlugin([{
      from: path.join(APP_PATH, 'model'),
      to: 'model',
      ignore: ['**/.DS_Store']
    }]),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: false,
      minimum: true,
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    cssExtractor,
    stylExtractor,
    new HtmlwebpackPlugin({
      title: 'test demo',
      template: path.resolve(TMPL_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['main'],
      inject: 'body'
    })
  ],
  devServer:{
    historyApiFallback: true,
    hot: false,
    inline: true,
  },
  devtool: false
}
