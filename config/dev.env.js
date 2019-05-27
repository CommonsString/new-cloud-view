'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:8099"'
  //  BASE_API: '"http://119.27.167.209:8099"'
  //  BASE_API: '"http://119.27.167.209:8060"'
})
