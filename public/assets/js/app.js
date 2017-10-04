window.addEventListener('load',_ => {
	'use strict'
	function toggleBackground(){
		hyperHTML.bind(document.querySelector('.background'))` `.remove()
	}
	hyperHTML.bind(document.body)`
	<div class='container-fluid' id="main">
		<div class='row align-items-center content'>
			<div class='col-1 col-md-4'></div>

			<div class='col-10 col-md-4 text-center card'>
				<div class="card-body">
					<h4 class="card-title">Search <span class='blue'>&amp;</span><span oninput='this.classList.add("err")' class='blue room' contenteditable=true>xkcd</span> history</h4>
						<div class="alert alert-info" role="alert" id='alert'>
							connecting...
						</div>
					<div class='card-block'>
						<div class="input-group">
							<input type="text" class="form-control" placeholder="Search for...">
							<span class="input-group-btn">
								<button class="btn btn-secondary" type="button">Go!</button>
							</span>
						</div>
					</div>
				</div>
				<div class='card-block'>
					<ul class='list-group mock' id='list'>
						<li class='list-group-item'> - </li>
						<li class='list-group-item'> - </li>
						<li class='list-group-item'> - </li>
						<li class='list-group-item'> - </li>
						<li class='list-group-item'> - </li>
						<li class='list-group-item'> - </li>
					</ul>
				</div>
				<div class="card-body">
				</div>
			</div>
			<div class='col-1 col-md-4'></div>
		</div>
	</div>
	<header class="header ">
		<div class="container-fluid">
			<div class="row">
			<span class="col-4">
			</span>
				<span class="text-muted col-4"></span>
				<span class="settings col-4 text-right">
					<!-- add a quick way to toggle -->
				<a onclick=${toggleBackground}> <i class="fa fa-gears fa-lg"></i></a>
			</span>
			</div>
		</div>
	</header>
	<footer class="footer ">
		<div class="container-fluid">
			<div class="row">
			<span class="col-4">
			<a href="https://github.com/kaliumxyz/bismundium/"> <i class="fa fa-github fa-lg"></i></a>
			</span>
			<span class="text-muted col-4"></span>
			<span class="settings col-4 text-right">
			</span>
			</div>
		</div>
	</footer>

	<div id="particles-js" class="background"></div>
		`
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
})

function match(el){
	rooms.find(x => x === el.innerText)
}

function toggleBackground(){
	'use strict'
	hyperHTML.bind(document.querySelector('.background'))` `
}