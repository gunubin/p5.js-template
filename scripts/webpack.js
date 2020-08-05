const configPath = require.resolve('./config/webpack.config')
const run = require('parallel-webpack').run
const server = require('./server')

run(configPath, {
  watch: true,
  maxRetries: 1,
  stats: false,
  maxConcurrentWorkers: 2, // use 2 workers
}, () => {
  server()
})
