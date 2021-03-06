const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const envTransformer = require("./build/envTransformer")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isH5 = process.env.UNI_PLATFORM === 'h5';

module.exports = isH5 ? {
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
    output:  {
      filename: 'static/js/[name].[hash:8].js',
      chunkFilename: 'static/js/[name].[hash:8].js'
    },
    plugins: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          }
        },
        sourceMap: true,
        parallel: true
      }),
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
} : {
  transpileDependencies:['@dcloudio/uni-ui']
};