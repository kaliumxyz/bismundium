'use strict'
// require ws and set it up to listen to port 31337.
const WebSocket = require('ws')
const ws = new WebSocket.Server({ port: 31337 })

const fif = require('find-in-files')

// todo:
// - Add a function to read out the DB.


ws.on('connection', socket => {

	console.log("User connected", socket)
	socket.send('connected')
	socket.on('message', 
		data => {
			console.log(data)
			fif.find(data, './database/', '.log$').then( 
			// data => data.forEach(x => console.log(x))
			socket.send
		)
		}
	)
	socket.on("disconnect", ev => {
		console.log('disconnected:' + socket)
	})
})