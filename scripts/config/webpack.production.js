const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const paths = require("./paths");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  entry: {
    app: [paths.js.index]
  },
  output: {
    path: paths.js.build,
    filename: "[name].js",
    publicPath: "/"
  },
  performance: {
    maxEntrypointSize: 700 * 1000,
    maxAssetSize: 800 * 1000
  },
  optimization: {
    splitChunks: {
      name: "loader",
      chunks: "async"
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
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
            join_vars: true
          },
          mangle: {
            keep_fnames: false
          },
          output: {
            comments: false,
            ecma: 5
          }
        }
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.BROWSER": true,
      APP_JS_HASH: `${new Date().getTime()}`
    })
  ]
});
