const path = require('path');
const fs = require('fs');

const _resolve = dir => path.resolve(__dirname, dir)

const _loadEnv = (envPath = '.env') => {
  const envFilePath = _resolve(`${process.cwd()}/${envPath}`)
  try {
    let res = {}

    if (!fs.existsSync(envFilePath)) return {}

    const data = fs.readFileSync(envFilePath, 'utf8')

    data.split('\n').forEach((kv) => {
      const [k, ...values] = kv.split('=')
      const key = k.replace(/\s+/g, '')
      const value = values.join('=').trim()

      if (key) {
        res[key] = value
      }
    })

    return res
  } catch (err) {
    console.error(err)
  }
}

const _getModeEnvPath = () => {
  const argvList = process.argv.slice(2)
  const modeIndex = argvList.findIndex(arg => arg === '-m' || arg === '--mode')
  const modeFuzzyIndex = argvList.findIndex(arg => arg.indexOf('-m') > -1 || arg.indexOf('--mode') > -1)

  if (
    modeIndex !== -1 &&
    modeIndex === modeFuzzyIndex &&
    !!argvList[modeIndex + 1] // both null vs empty
  ) return `.env.${argvList[modeIndex + 1]}`

  if (
    modeFuzzyIndex !== -1 &&
    !!argvList[modeFuzzyIndex]
  ) return `.env.${argvList[modeFuzzyIndex].split('=')[1]}`
}

module.exports = function getEnvConfig() {
  const modeEnvPath = _getModeEnvPath() || `.env.${process.env.NODE_ENV}`;
  return Object.assign(
    {},
    _loadEnv('.env'),
    _loadEnv('.env.local'),
    _loadEnv(modeEnvPath),
    _loadEnv(modeEnvPath + ".local"),
  )
}
