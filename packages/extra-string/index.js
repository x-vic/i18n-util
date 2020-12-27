'use strict'
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/extra-string.cjs.prod.js')
} else {
  module.exports = require('./lib/extra-string.cjs.js')
}
