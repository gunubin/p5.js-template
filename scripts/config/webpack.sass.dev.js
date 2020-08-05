const merge = require('webpack-merge')
const common = require('./webpack.sass.common.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globImporter = require('node-sass-glob-importer')

module.exports = merge.smart(
  common,
  {
    mode: 'development',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: true,
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
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

