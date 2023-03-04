**use node gloable variable: process.env to divide the prod and the dev;**
- use package cross-env to add a key envMode in process.env
- use package Dotenv to put the different variabel in the process.env.envMode
- use package webpack-merge to take the union set
- warning: the webpack error:because webapck implement the .env.prod,so the env is production,but when run the defineplugin it has the conflict
  - solution:optimization:{nodeEnv:false}

**set the devServer proxy to avoid cross-domain** 
- in the webpack.dev.js you can set VUE_APP_useURL as axios.baseURL
- and in the proxy also can set the secure(disable http)、 changeOrigin(set the target as host) and pathRewrite to replace baseurl or other url,

[refer link](refer link:https://blog.csdn.net/weixin_42349568/article/details/124370794)