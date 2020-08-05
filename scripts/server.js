const bs = require('browser-sync').create()
const paths = require('./config/paths')
const {browserSync} = require('./config/project')
const logger = require('./lib/logger')

module.exports = function server() {

  bs.init({
    ...browserSync,
    open: false,
    notify: false,
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return snippet + match
        },
      },
    },
  })

  bs.watch(`${paths.build}/**/*.*`).on('change', file => {
    bs.reload(file)
  })

// php or twig
  bs.watch(`**/*.(php|twig|html)`).on('change', file => {
    bs.reload(file)
  })

}

function exitHandler(options, err) {
  if (options.cleanup) {
    bs.exit()
  }
  if (err) {
    logger.log(err)
  }
  if (options.exit) {
    process.exit()
  }
}

// FIXME: exit callback
//do something when app is closing
process.on('exit', exitHandler.bind(null, {cleanup: true}))
process.on('SIGINT', exitHandler.bind(null, {exit: true}))

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, {exit: true}))
process.on('SIGUSR2', exitHandler.bind(null, {exit: true}))

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit: true}))


