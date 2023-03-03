const path = require("path");
const { merge } = require("webpack-merge");
const BaseWebpackConfig = require("./webpack.config.js");

module.exports = merge(BaseWebpackConfig, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./js/[name].[chunkhash].js",
  },
});
