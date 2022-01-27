const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const envTransformer = require("./build/envTransformer")

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
    plugins: [
      new CopyWebpackPlugin([{ 
        from: './public/gome-index.html',
        transform: envTransformer
      }]),
      new CopyWebpackPlugin([{ 
        from: './public/gome-index-h5.html',
        transform: envTransformer
      }])
    ]
  }
}