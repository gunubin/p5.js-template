const path = require('path')
const paths = require('./paths')

module.exports = {
  name: 'Javascript',
  resolve: {
    modules: ['node_modules', paths.src],
    extensions: ['.js'],
    // alias: {mobx: path.resolve(process.cwd(), 'node_modules/mobx')},
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules\/(?!(dom7|swiper|youtube-player)\/).*/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      ie: 11,
                    },
                    useBuiltIns: 'entry',
                    corejs: 2,
                  },
                ],
                '@babel/preset-flow',
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                '@babel/plugin-transform-modules-commonjs',
                '@babel/plugin-syntax-import-meta',
                '@babel/plugin-proposal-json-strings',
                '@babel/plugin-proposal-function-sent',
                '@babel/plugin-proposal-export-namespace-from',
                '@babel/plugin-proposal-numeric-separator',
                '@babel/plugin-proposal-throw-expressions',
                '@babel/plugin-proposal-export-default-from',
                '@babel/plugin-proposal-logical-assignment-operators',
                '@babel/plugin-proposal-optional-chaining',
                [
                  '@babel/plugin-proposal-pipeline-operator',
                  {
                    proposal: 'minimal',
                  },
                ],
                '@babel/plugin-proposal-nullish-coalescing-operator',
                '@babel/plugin-proposal-do-expressions',
                '@babel/plugin-proposal-function-bind',
              ],
            },
          },
        ],
      },
      {
        test: require.resolve('p5'),
        loader: 'expose-loader',
        options: {
          exposes: 'p5',
        },
      },
    ],
  },
}
