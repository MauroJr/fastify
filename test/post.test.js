'use strict'

const t = require('tap')
const Fastify = require('../fastify')
const sget = require('simple-get').concat
require('./helper').payloadMethod('post', t)
require('./input-validation').payloadMethod('post', t)

t.test('Request should have the rawBody property / 1', t => {
  t.plan(4)
  const fastify = Fastify()
  fastify.post('/', (req, reply) => {
    t.ok(typeof req.rawBody === 'string')
    reply.send(req.rawBody)
  })

  fastify.inject({
    method: 'POST',
    url: '/',
    payload: { hello: 'world' }
  }, (err, res) => {
    t.error(err)
    t.strictEqual(res.statusCode, 200)
    t.strictEqual(res.payload, JSON.stringify({ hello: 'world' }))
  })
})

t.test('Request should have the rawBody property / 2', t => {
  t.plan(4)
  const fastify = Fastify()
  fastify.post('/', (req, reply) => {
    t.ok(typeof req.rawBody === 'string')
    reply.send(req.rawBody)
  })

  fastify.listen(0, function (err) {
    if (err) {
      t.error(err)
    }

    fastify.server.unref()

    sget({
      method: 'POST',
      url: 'http://localhost:' + fastify.server.address().port,
      body: JSON.stringify({ hello: 'world' }),
      headers: {
        'content-type': 'application/json;charset=utf-8'
      }
    }, (err, response, body) => {
      t.error(err)
      t.strictEqual(response.statusCode, 200)
      t.deepEqual(body.toString(), JSON.stringify({ hello: 'world' }))
    })
  })
})
