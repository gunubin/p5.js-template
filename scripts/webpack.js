const configure = require('../config/webpack.config')
const statsOptions = require('../config/stats')
const webpack = require('webpack')

const webpackEnv = 'development'

const compiler = webpack(configure(webpackEnv))
compiler.watch({}, (err, stats) => {
  console.log(stats.toString(statsOptions))
  if (err) {
    console.log(err)
  }
})
