const getEnvConfig = require("./getEnvConfig")

const envConfig = getEnvConfig();
const varReg = /\<\%\=\W*(\w+)\W*%\>/g;

function envTransformer(content, path) {
  const str = content.toString();
  return str.replace(varReg, function(m0, m1, idx) {
    return envConfig[m1];
  })
}

module.exports = envTransformer;