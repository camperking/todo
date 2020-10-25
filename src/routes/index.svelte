<script>
	
</script>

<div class="main">
	<h1>TodoList</h1>
	<h2>easy to use, share with your friends, access from everywhere</h2>
	<a href="todo/new">Try now!</a>
</div>


<style>

	.main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	h1 {
		border-bottom: 2px solid #ff9100;
		font-size: 3em;
		color: rgba(255, 255, 255, 0.8);
	}

	h2 {
		color: rgba(255, 255, 255, 0.7);
		text-align: center;
	}

	a {
		text-decoration: none;
		border-bottom: 2px solid gray;
		margin: 0 1em;
		text-transform: uppercase;
	}

	a:hover {
		border-bottom-color: #ff9100;
	}

</style>

<svelte:head>
	<title>TodoList App - Create and share Todo lists and protect them with a password</title>
</svelte:head>