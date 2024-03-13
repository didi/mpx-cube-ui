const traverseStylusToConfig = require('./traverse-config.js')

async function extract() {
  return traverseStylusToConfig()
}

module.exports = {
  extract
}
