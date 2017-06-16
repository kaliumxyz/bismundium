'use strict'
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./xkcd')
// require ws and set it up to listen to port 31337.
const WebSocket = require('ws')
const ws = new WebSocket.Server({ port: 31337 })

const fif = require('find-in-files')

db.serialize( _ => {
	db.run('DROP TABLE username')
	db.run("CREATE TABLE username (info TEXT)")
	  var stmt = db.prepare("INSERT INTO username VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM username", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
})



// db.open('./xkcd').then( x => x.get("INSERT INTO XKCD VALUES PEW"), _ => process.abort())
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
		, console.error, console.log)
		}
	)
	socket.on("disconnect", ev => {
		console.log('disconnected:' + socket)
	})
})