'use strict'
const WebSocket = require('ws')
const fs = require('fs')

function seed(room = 'test', ...callback) {
	const connection = new euphoriaConnection(room)
	connection.once('open', _ => {
		db.serialize(_ => {
			db.run(`CREATE TABLE IF NOT EXISTS ${room} (id TEXT, time INTEGER, agentId TEXT, name TEXT, content TEXT)`)
			// We are ignoring parents for now, also any operational information.
			const stmt = db.prepare(`INSERT INTO ${room} (id, time, agentId, name, content) VALUES (?, ?, ?, ?, ?)`)
			
			function handleReply(data) {
				// Run trough every msg received and queue it for the prepared statement.
				data.data.log.forEach(x => {
					stmt.run([x.id, x.time, x.sender.id, x.sender.name, x.content])
					// console.log(x)
				})

				db.each(`SELECT * FROM ${room} WHERE content LIKE '%sql%'`, function (err, row) {
					// console.error(err)
					console.log(row)
				}, _ => callback.forEach(f => f()))
			}
			connection.downloadAll(handleReply, _ => stmt.finalize())
		})
	})
}


if (!fs.existsSync('./data.db')){
    console.log('The seeder script has not been ran yet.', 'Run "npm run seed".')
    // process.exit()
}

const knex = require('knex')({
    dialect: "sqlite3",
    connection: {
        filename: "./data.db"
    },
    useNullAsDefault: true
})
// Create a table 
knex.schema.createTable('users', function(table) {
  table.increments('id');
  table.string('user_name');
}) 

// ...and another 
.createTable('accounts', function(table) {
  table.increments('id');
  table.string('account_name');
  table.integer('user_id').unsigned().references('users.id');
})
 
// Then query the table... 
.then(function() {
  return knex.insert({user_name: 'Tim'}).into('users');
})
 
// ...and using the insert id, insert into the other table. 
.then(function(rows) {
  return knex.table('accounts').insert({account_name: 'knex', user_id: rows[0]});
})
 
// Query both of the rows. 
.then(function() {
  return knex('users')
    .join('accounts', 'users.id', 'accounts.user_id')
    .select('users.user_name as user', 'accounts.account_name as account');
})
 
// .map over the results 
.map(function(row) {
  console.log(row);
})
 
// Finally, add a .catch handler for the promise chain 
.catch(function(e) {
  console.error
})