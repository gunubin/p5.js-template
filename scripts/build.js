const webpack = require('webpack')
const config = require('./config/webpack.production')
const configSass = require('./config/webpack.sass.production')
const statsConfig = require('./config/stats')
const logger = require('./lib/logger')
const paths = require('./config/paths')
const fs = require('fs-extra')

const runWebpackCompiler = webpackConfig =>
  new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        return reject(err)
      }
      logger.info(stats.toString(statsConfig))
      return resolve()
    })
  })


const compile = () => Promise.resolve()
  .then(() => logger.info('Stating compiler...'))
  .then(() => runWebpackCompiler([
    config,
    configSass
  ]))
  .then(() => {
    logger.success(`Compiler finished successfully! See ${paths.build}.`)
  })
  .catch(err => logger.error('Compiler encountered errors.', err))

compile()


