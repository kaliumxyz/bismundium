'use strict'
const io = require('socket.io')(31337)

io.on('client-input', console.log)