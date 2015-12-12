'use strict'

var assert = require('assert')
var makeRepo = require('./lib/make-repo')

function semanticreleases4everyone(repo, token) {
  assert(typeof repo === 'string', 'invalid repo, pass a string pls')
  assert(typeof token === 'string', 'invalid github token, pass a string pls')

  
}

module.exports = semanticreleases4everyone
