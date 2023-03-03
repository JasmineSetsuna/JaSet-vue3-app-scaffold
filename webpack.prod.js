const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BaseWebpackConfig = require("./webpack.config.js");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const consoleObj = function () {
  if (process.env.NODE_ENV === "produciton") {
    return {
      parallel: true, //multi-process
      extractComments: false,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    };
  } else {
    return {
      parallel: true,
    };
  }
};

module.exports = merge(BaseWebpackConfig, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./js/[name].[chunkhash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: "body",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.analyMode == "true" ? "server" : "disabled", 
      generateStatsFile: false, 
      statsOptions: { source: false },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(consoleObj()),
    ],
  },
});
