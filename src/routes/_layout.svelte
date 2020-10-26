


<div class="body">
	<header>
		
		<a href="todo/new" class="feature">new list</a>
		<a href="/">home</a>
		<a href="info">info</a>
	</header>
	<main>
		<slot />
	</main>
	<footer>
		<div>
			by <a href="https://xdevbox.net/">xdevbox.net</a> 
		</div>
		<div>
			source on <a href="https://github.com/camperking/todo/">github</a>
		</div>
	</footer>
</div>

<style>
    .body {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: black;
		background-image: radial-gradient(farthest-corner at 20% 20%, black 10%, hsla(34, 50%, 50%, 0.2) 50%, hsla(34, 100%, 50%, 0.4) 90%, black);
		background-repeat: no-repeat;
	}

	header {
		display: flex;
		justify-content: end;
		color: rgba(255, 255, 255, 0.7);
		margin-top: 0.5em;
	}

	.feature {
		/* border-bottom-color: #ff9100; */
		color: white;
	}

	main {
		/* display: flex; */
		/* flex-direction: column; */
		/* align-items: center; */
		margin: 0 2em;
		/* height: 100%; */
	}

	header a{
		text-decoration: none;
		border-bottom: 2px solid gray;
		margin: 0 1em;
		text-transform: uppercase;
	}

	header a:hover{
		border-bottom-color: #ff9100;
	}

	header {
		text-transform: uppercase;
	}

	footer {
		display: flex;
		justify-content: space-between;
		margin: 0 0.5em 0.25em;
	}

	footer a {
		text-decoration: none;
		color: rgba(255, 255, 255, 0.5);
	}

</style>