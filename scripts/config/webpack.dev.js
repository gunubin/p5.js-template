const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const paths = require('./paths')
const Dotenv = require('dotenv-webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge.smart(common, {
  mode: 'development',
  devtool: 'heap-module-eval-source-map',
  entry: {
    app: [
      require.resolve('./preImports'),
      paths.js.index
    ]
  },
  output: {
    path: paths.js.build,
    filename: '[name].js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      name: 'loader',
      chunks: 'async'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.BROWSER': true,
      APP_JS_HASH: `${new Date().getTime()}`
    }),
  ]
})
