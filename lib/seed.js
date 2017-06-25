'use strict'
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./euphoria.db')
const euphoriaConnection = require('euphoria-connection')



function seed(room = 'test', ...callback) {
	const connection = new euphoriaConnection(room)
	connection.once('open', _ => {
		db.serialize(_ => {
			db.run(`CREATE TABLE IF NOT EXISTS ${room} (id TEXT, time INTEGER, agentId TEXT, name TEXT, content)`)
			// We are ignoring parents for now, also any operational information.
			const stmt = db.prepare(`INSERT INTO ${room} (id, time, agentId, name, content) VALUES (?, ?, ?, ?, ?)`)
			
			function handleReply(data) {
				// Run trough every msg received and queue it for the prepared statement.
				console.log(data)
				data.data.log.forEach(x => {
					stmt.run([x.id, x.time, x.sender.id, x.sender.name, x.content])
					console.log(x)
				})

				db.each(`SELECT * FROM ${room}`, function (err, row) {
					console.log(row)
				})
			}
			connection.downloadAll(handleReply, _ => {stmt.finalize(), callback.forEach(f => f())})
		})
	})
}

module.exports = seed