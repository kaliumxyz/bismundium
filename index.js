'use strict'
const WebSocket = require('ws')
const fs = require('fs')

if (!fs.existsSync('./data.db')){
    console.log('The seeder script has not been ran yet.', 'Run "npm run seed".')
    process.exit()
}


// // pg = PostgreSQL
// const { Client } = require('pg')
// require('dotenv').config()
// const ws = new WebSocket.Server({ port: process.env.port })
//`
//
// async function connect () {
//
// 	const client = new Client(`postgres://${process.env.db_user}:${process.env.db_pass}@localhost:5432/euphoria`)
//
// 	await client.connect()
// 	return client
// }
//
// connect()
// 	.catch(console.error)
// 	.then( con => {
// 		console.log('connected')
//
// 	})
//
// // db.open('./xkcd').then( x => x.get("INSERT INTO XKCD VALUES PEW"), _ => process.abort())
// // todo:
// // - Add a function to read out the DB.
//
// ws.on('connection', socket => {
// 	console.log("User connected")
// 	socket.send('connected')
// 	socket.on('message',
// 		data => {
// 			socket.send(data, console.error)
// 			console.log(data)
// 			db.serialize(_ => {
// 				db.each(`SELECT * FROM xkcd WHERE content LIKE '${data}'`, function (err, row) {
// 					socket.send(JSON.stringify(row))
// 				})
// 			})
// 		})
// 	socket.on("disconnect", ev => {
// 		console.log('disconnected:' + socket)
// 	})
// })
