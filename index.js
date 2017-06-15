'use strict'
// require socket.io and set it up to listen to port 31337.
const io = require('socket.io')(31337)

// todo:
// - Add a function to read out the DB.


io.on('connection', socket => {
	socket.emit('connected', 'msgs')
	socket.on('client-input', console.log)
})