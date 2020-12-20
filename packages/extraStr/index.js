'use strict'
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/extraStr.cjs.prod.js')
} else {
  module.exports = require('./lib/extraStr.cjs.js')
}
