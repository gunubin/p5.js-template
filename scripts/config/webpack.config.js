const config = require('./webpack.dev')
const configSass = require('./webpack.sass.dev')

module.exports = [
  config,
  configSass,
]
