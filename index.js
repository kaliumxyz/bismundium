'use strict'
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./xkcd.db')
const euphoriaConnection = require('euphoria-connection')
const connection = new euphoriaConnection('xkcd')
// require ws and set it up to listen to port 31337.
const WebSocket = require('ws')
const ws = new WebSocket.Server({ port: 31337 })

connection.once('open', _ => {
	db.serialize(_ => {
		db.run('DROP TABLE username')
		db.run("CREATE TABLE username (info TEXT)")
		const stmt = db.prepare("INSERT INTO username VALUES (?)")
		function handleReply(data) {
			console.log(data)
			data.data.log.forEach((x, i) => stmt.run(`${x.sender.name} ${i}`))
			stmt.finalize()
			db.each("SELECT rowid AS id, info FROM username", function (err, row) {
				console.log(row.id + ": " + row.info)
			})
		}
		connection.download(10, null, handleReply)
	})

})




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