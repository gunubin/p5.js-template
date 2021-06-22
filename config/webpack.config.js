const webpack = require('webpack')
const paths = require('./paths')
const TerserPlugin = require('terser-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const { browserSync } = require('./project')

const staticAssetImagesName = 'images/[name].[ext]'

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000',
)

module.exports = (webpackEnv, sketchName) => {
  const isEnvProduction = webpackEnv === 'production'
  const isEnvDevelopment = webpackEnv === 'development'

  const getPublicRootPath = (env) => {
    const map = {
      development: paths.public + 'assets',
      production: paths.public + 'assets',
    }
    return map[env] || ''
  }

  return {
    name: 'Assets',
    mode: isEnvProduction ? 'production' : 'development',
    devtool: isEnvProduction ? 'source-map' : 'cheap-module-source-map',
    entry: {
      app: [
        require.resolve('./preImports'),
        paths.js.index,
      ],
    },
    output: {
      path: paths.build,
      filename: 'js/[name].js',
      publicPath: '/',
    },
    optimization: {
      minimize: isEnvProduction,
      splitChunks: {
        name: 'loader',
        chunks: 'async',
      },
      minimizer: [
        new TerserPlugin({
          // cache: true,
          parallel: true,
          // sourceMap: true,
          // Minimize all JavaScript output of chunks
          // https://webpack.js.org/plugins/terser-webpack-plugin/
          terserOptions: {
            compress: {
              ecma: 5,
              keep_fnames: false,
              warnings: false,
              conditionals: true,
              unused: true,
              comparisons: true,
              sequences: true,
              dead_code: true,
              evaluate: true,
              if_return: true,
              join_vars: true,
            },
            mangle: {
              keep_fnames: false,
            },
            output: {
              comments: false,
              ecma: 5,
            },
          },
        }),
      ],
    },
    resolve: {
      modules: ['node_modules', paths.src],
      extensions: ['.js'],
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules\/(?!(dom7|swiper|youtube-player)\/).*/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        {
          test: /\.(jpg|jpeg|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: imageInlineSizeLimit,
                name: staticAssetImagesName,
                publicPath: getPublicRootPath(webpackEnv),
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.sketchName': JSON.stringify(sketchName),
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.env.BROWSER': true,
      }),
      new BrowserSyncPlugin(browserSync, { reload: false, injectCss: true }),
    ],
    performance: false,
  }
}
