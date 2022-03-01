const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const envTransformer = require("./build/envTransformer")

const isH5 = process.env.UNI_PLATFORM === 'h5';
const outputConfig = isH5 ? {
  output:  {
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].js'
  }
} : {};
module.exports = {
  transpileDependencies:['@dcloudio/uni-ui'],
  devServer: {
    https: {
      key: fs.readFileSync(__dirname + '/build/cert/local.meiwu365.com.key'),
      cert: fs.readFileSync(__dirname + '/build/cert/local.meiwu365.com.pem')
    },
    host: 'local.meiwu365.com',
    port: 443
  },
  configureWebpack: {
    ...outputConfig,
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'gome-*.html',
          context: './public',
          transform: envTransformer
        },
        {
          from: 'libs/*',
          context: './public'
        },
      ])
    ]
  }
}