const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const BaseWebpackConfig = require("./webpack.config.js");

module.exports = merge(BaseWebpackConfig, {
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist_dev"),
    filename: "./js/[name].[chunkhash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: "body",
    }),
  ],
  devServer: {
    hot: true,
    open: true,
    port: 8080,
    host: "localhost",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
  },
});
