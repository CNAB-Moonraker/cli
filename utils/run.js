#!/usr/bin/env node

const { spawn } = require("child_process")
const os = require('os')
const path = require('path')
const moonrakerDir = path.resolve(os.homedir(), '.moonraker')
const webDir = path.resolve(moonrakerDir, 'web')

/**
 * Module dependencies.
 */

var app = require('../server/app')
var http = require('http')

/**
 * Get port from environment and store in Express.
 */


/**
 * Create HTTP server.
 */

var server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
function run(givenPort) {
  var port = normalizePort(givenPort || process.env.PORT || '3002')
  app.set('port', port)
  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log('API live on ' + bind)
  if (process.argv.includes(`-d`)) serveDash()
}
module.exports = run

/**
 *
 */
function serveDash() {
  const serve = spawn(/^win/.test(process.platform) ? 'serve.cmd' : 'serve', ["-s", "dist"], { cwd: webDir })

  console.log('Dashboard live on port 5000')

  serve.stdout.setEncoding(`utf8`)
  serve.stdout.on('data', console.log)

  serve.on('error', (error) => {
    console.log(`Error: ${error.message}`)
  })

  serve.on("close", code => {
    if (code === 0) {
      console.log(`goodbye.`)
    }
  })

  server.on('close', () => {
    serve.kill('SIGINT')
  })
}