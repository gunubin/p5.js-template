const configure = require('../config/webpack.config')
const statsOptions = require('../config/stats')
const webpack = require('webpack')

const webpackEnv = 'development'

// example: yarn run [sketchName]
const [, , sketchName = 'marchingSquares'] = process.argv

const compiler = webpack(configure(webpackEnv, sketchName))
compiler.watch({}, (err, stats) => {
  console.log(stats.toString(statsOptions))
  if (err) {
    console.log(err)
  }
})
