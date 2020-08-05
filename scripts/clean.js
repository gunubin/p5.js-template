const logger = require('./lib/logger')
const paths = require('./config/paths')
const fs = require('fs-extra')

const clean = () =>
  new Promise((resolve, reject) => {
    logger.info(`Copying static assets from ${paths.src} to ${paths.public}.`)
    fs.emptyDirSync(paths.build) // clean up
    logger.info(`copy done.`)
    return resolve()
  })

const compile = () => Promise.resolve()
  .then(() => logger.info('Stating clean...'))
  .then(() => clean())
  .then(() => {
    logger.success(`Clean finished successfully! See ${paths.build}.`)
  })
  .catch(err => logger.error('Clean encountered errors.', err))

compile()


