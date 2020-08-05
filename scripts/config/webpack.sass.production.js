const merge = require('webpack-merge')
const common = require('./webpack.sass.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const globImporter = require('node-sass-glob-importer')

module.exports = merge.smart(
  common,
  {
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: loader => [
                  require("cssnano")(),
                  require('autoprefixer')(),
                  require("css-mqpacker")({
                    sort: true,
                  }),
                ],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  importer: globImporter(),
                },
              },
            },
          ],
        },
      ],
    },
  },
)
