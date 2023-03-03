const path = require("path");
const { merge } = require("webpack-merge");
const BaseWebpackConfig = require("./webpack.config.js");

module.exports = merge(BaseWebpackConfig, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist_dev"),
    filename: "./js/[name].[chunkhash].js",
  },
  devServer: {
    hot: true,
    open: true,
    port: 8080,
    host: "localhost",
  },
});
