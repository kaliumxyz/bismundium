'use strict'
// require ws and set it up to listen to port 8050.
const WebSocket = require('ws')
const sqlite3 = require('sqlite3')
const ws = new WebSocket.Server({ port: 8050 })
// I'm assuming the seeder script has been ran.
const db = new sqlite3.Database('./euphoria.db')


const { Client } = require('pg')

const client = new Client()

await client.connect()

const res = await client.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!
await client.end()


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
				db.each(`SELECT * FROM xkcd WHERE content LIKE '${data}'`, function (err, row) {
					socket.send(JSON.stringify(row))
				})
			})
		})
	socket.on("disconnect", ev => {
		console.log('disconnected:' + socket)
	})
})
