// const nodeEnv = process.env.NODE_ENV || 'development'
// const path = './.env.' + nodeEnv
const path = './.env'

const envConfig = require('dotenv-safe').config({
  allowEmptyValues: true,
  path: path,
}).parsed

module.exports = envConfig
