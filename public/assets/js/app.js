/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/particles.json', _ => {
	const socket = new WebSocket('ws://localhost')
	const input = document.querySelector('input')
	const list = hyperHTML.bind(document.getElementById('list'))
	const alarm = hyperHTML.bind(document.getElementById('alert'))
	socket.onopen = _ => input.disabled = false
	let timeout
	// sends a search request to the server.
	function search() {
		socket.send(JSON.stringify({ "type": "search", "data": input.value }))
	}
	// formats the incoming data into an unordered list.
	function format() {

	}
	socket.onopen = data => {
		alarm`
		Connected.
		`.classList.replace('alert-info', 'alert-success')
		
	
		const timeout = window.setTimeout(_ => {alarm``.hidden = true}, 1000)
		
	}
	socket.onerror = data => {
		alarm`
		Our backend is currently offline.
		`.classList.replace('alert-info', 'alert-danger')
	}
	socket.onmessage = data => {
		list`<li class='list-group-item'> ${JSON.stringify(data.data)} </li>`
	}
	input.onkeypress = ev => {
		window.clearTimeout(timeout)
		timeout = window.setTimeout(suggest, 600)
	}

})
