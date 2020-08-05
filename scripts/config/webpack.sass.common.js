const project = require('./project')
const paths = require('./paths')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const IS_TEST = process.env.NODE_ENV === 'test'
const staticAssetFontsName = 'fonts/[name].[hash:8].[ext]'
const staticAssetImagesName = 'images/[name].[hash:8].[ext]'
const getPublicRootPath = (env) => {
  const map = {
    production: project.publicRootPath + 'assets/css',
    test: project.testPublicRootPath + 'assets/css',
  }
  return map[env] || ''
}

module.exports = {
  name: 'Style',
  entry: {
    styles: paths.mainSass,
  },
  output: {
    path: paths.css,
    filename: '[name].css',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: staticAssetFontsName,
              publicPath: getPublicRootPath(process.env.NODE_ENV)
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: staticAssetImagesName,
              publicPath: getPublicRootPath(process.env.NODE_ENV)
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './[name].css',
    }),
  ],
  resolve: {
    extensions: ['.css', '.js'],
  },
}

