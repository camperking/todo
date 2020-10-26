<svelte:head>
	<title>About todoList</title>
</svelte:head>

<script>
    import { fade } from 'svelte/transition';

</script>

<div class="main" in:fade={{delay: 600}}>
    
    <h1>About this site</h1>
    
    <p>
        todoList is a webapp to create and share todo lists. 
        It is responsive, easy to use and accessible from everywhere. 
        The technology used to develop this app, allows a fast and visually appealing style and user interface. 
        The use of todoList is free and the source is available on github. Main features of todoList are:
    </p>
    <ul>
        <li>
            <em>no use of cookies</em> - todoList does not set any cookies, this is GDPR friendly
        </li>
        <li>
            <em>short tokens</em> - no cookies means everything works with tokens, they are short and easy to remember, the user just has to bookmark the link to his todoList 
        </li>
        <li>
            <em>password protection</em> - allows to control access to lists, setting an empty password makes list public again
        </li>
        <li>
            <em>visually appealing</em> - fast and responsive ui, smooth and flicker free transitions and animations
        </li>
    </ul>
</div>

    
<style>

    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 50vw;
        margin: 0 auto;
        font-size: 1.2em;
    }

    @media screen and (max-width: 992px) {
        .main {
            max-width: 90vw;
        }
}

</style>