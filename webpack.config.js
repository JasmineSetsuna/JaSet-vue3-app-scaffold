// initialize the path
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log("----",process.env.envMode);

module.exports = {
  // five key element
  mode: "production",
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./js/[name].[chunkhash].js",
  },
  // module: {},
  /**TypeError: item.plugins.unshift is not a function:
   * the reason is the plugins is null,need to fill it or annotate it
   */
  plugins:[
    //plugins's config
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body" //the loaction that the bundle js put in 
    })
  ],
  devServer: {
    hot: true,
    open: true,
    port: 8080,
    host: "localhost",
  },
};
