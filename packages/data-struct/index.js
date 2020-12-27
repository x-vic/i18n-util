'use strict'
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lib/data-struct.cjs.prod.js')
} else {
  module.exports = require('./lib/data-struct.cjs.js')
}
