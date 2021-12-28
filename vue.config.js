const fs = require('fs');

module.exports = {
  transpileDependencies:['@dcloudio/uni-ui'],
  devServer: {
    https: {
      key: fs.readFileSync(__dirname + '/build/cert/local.meiwu365.com.key'),
      cert: fs.readFileSync(__dirname + '/build/cert/local.meiwu365.com.pem')
    },
    host: 'local.meiwu365.com',
    port: 443
  }
}