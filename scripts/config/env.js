const deployTarget = process.env.DEPLOY_TARGET || 'development'
console.log(deployTarget)

let path = './.env.' + deployTarget

const envConfig = require('dotenv-safe').config({
  allowEmptyValues: true,
  path: path,
}).parsed
module.exports = envConfig
