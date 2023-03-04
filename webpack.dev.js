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
    proxy: {
      "/api": {
        secure: false,
        changeOrigin: true,
        target:
          "https://www.fastmock.site/mock/fa60191c75fe2ea22d75f95e931c8125/testaxios",
        pathRewrite: { "^/api": "" },
      },
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
  },
});
