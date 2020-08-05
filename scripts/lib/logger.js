const chalk = require('chalk')

exports.log = console.log.bind(console)

exports.error = messages => {
  console.error(chalk.red(messages))
}

exports.info = messages => {
  console.info(chalk.cyan(messages))
}

exports.success = messages => {
  console.log(chalk.green(messages))
}

exports.warn = messages => {
  console.warn(chalk.yellow(messages))
}

