'use strict'
// require ws and set it up to listen to port 31337.
const WebSocket = require('ws')
const ws = new WebSocket.Server({ port: 31337 })





// db.open('./xkcd').then( x => x.get("INSERT INTO XKCD VALUES PEW"), _ => process.abort())
// todo:
// - Add a function to read out the DB.

ws.on('connection', socket => {

	console.log("User connected")
	socket.send('connected')
	socket.on('message',
		data => {
			socket.send(data, console.error)
			console.log(data)
			db.serialize(_ => {
				db.each("SELECT info FROM username", function (err, row) {
					socket.send(row.info, console.error)
				})
			})
			socket.on("disconnect", ev => {
				console.log('disconnected:' + socket)
			})
})
})