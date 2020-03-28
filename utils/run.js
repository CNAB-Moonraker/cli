#!/usr/bin/env node

const { spawn } = require("child_process")
const os = require('os')
const path = require('path')
const moonrakerDir = path.resolve(os.homedir(), '.moonraker')
const webDir = path.resolve(moonrakerDir, 'web')

/**
 * Module dependencies.
 */



/**
 * Listen on provided port, on all network interfaces.
 */
function run({ port: givenPort, useAzure }) {
  process.env.USE_AZURE = useAzure;
  var app = require('../server/app')
  var http = require('http')
  var server = http.createServer(app)

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
  var addr = this.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log('Moonraker live on ' + bind)
}
module.exports = run
