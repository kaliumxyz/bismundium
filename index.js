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
			socket.send(data, console.error)
			console.log(data)
			fif.find(data, './database/', '.log$').then( 
			//data => data.forEach(x => console.log(x))
			data => {
				for(let results in data){
				console.log(results)
				console.log(data[results])
				socket.send(JSON.stringify(data[results]), console.error).bind(socket)
			}}
		)
		}
	)
	socket.on("disconnect", ev => {
		console.log('disconnected:' + socket)
	})
})