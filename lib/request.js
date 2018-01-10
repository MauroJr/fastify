'use strict'

function Request (params, req, query, headers, log) {
  this.params = params
  this.raw = req
  this.query = query
  this.headers = headers
  this.log = log
  this.body = null
  this.rawBody = null
}

function buildRequest (R) {
  function _Request (params, req, query, headers, log) {
    this.params = params
    this.raw = req
    this.query = query
    this.headers = headers
    this.log = log
    this.body = null
    this.rawBody = null
  }
  _Request.prototype = new R()

  return _Request
}

Object.defineProperty(Request.prototype, 'req', {
  get: function () {
    return this.raw
  }
})

module.exports = Request
module.exports.buildRequest = buildRequest
