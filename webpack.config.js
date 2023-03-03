// initialize the path
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader/dist/index");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const envMode = process.env.envMode;
require("dotenv").config({ path: `.env` }); //implement the .env extract the variable to the process.env
require("dotenv").config({ path: `.env.${envMode}` });

const prefixRE = /^VUE_APP_/;
let env = {};
for (const key in process.env) {
  if (key == "NODE_ENV" || prefixRE.test(key)) {
    env[key] = JSON.stringify(process.env[key]);
  }
}

module.exports = {
  // five key element in webpack
  mode: "production",
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./js/[name].[chunkhash].js",
  },
  module: {
    rules: [
      // js file
      {
        test: /\.js$/, //mathc the js file
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-runtime"]],
            cacheDirectory: true,
          },
        },
        exclude: /node_modules/,
      },
      // vue file
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      // scss && css file
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  /**TypeError: item.plugins.unshift is not a function:
   * the reason is the plugins is null,need to fill it or annotate it
   */
  plugins: [
    //plugins's config
    new webpack.DefinePlugin({
      // 定义环境和变量
      "process.env": {
        ...env,
      },
      __VUE_OPTIONS_API__: false, //避免控制台警告信息
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: "body", //the loaction that the bundle js put in
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename:"assets/styles/[contenthash].css"
    })
  ],
  /** the webpack error:because webapck implement the .env.prod,so the env is production,but when run the defineplugin it has the conflict
   * the solution is setup optimization:{nodeEnv:false}
   */
  optimization: {
    nodeEnv: false,
  },
  devServer: {
    hot: true,
    open: true,
    port: 8080,
    host: "localhost",
  },
};
