<script context="module">
    export async function preload(page, session) {
        const { listId } = page.params;

        const res = await this.fetch(`api/account/${listId}`);
        const todoList = await res.json();


        return { todoList, listId }
    }
</script>


<script>
    import { stores } from '@sapper/app';
    import { quintOut, quintInOut } from 'svelte/easing';
	import { crossfade, fade, slide, fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { onMount } from 'svelte';
    
    const { page, session } = stores();

    export let todoList;
    export let listId;

    onMount(() => {
        console.log(todoList.id);
        history.pushState({}, todoList.id, 'todo/'+todoList.id);
    });

    let password = '';
    let passwordError = '';

    let showChangePassword = false;
    let newPassword = '';

    let showEditTitle = false;

    let value;

    async function add() {
        const body = {
            list: todoList.id,
            text: value,
            state: 'todo',
            password
        };

        const res = await fetch('api/todo/add/' + todoList.id, {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(body)
        });

        const data = await res.json();

        
        todoList.todo.push(data);
        todoList = todoList;
        value = '';
    }


    async function unlock() {
        const res = await fetch('api/account/' + listId, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password})
        });
        const data = await res.json();
        // console.log(data);
        if (data.error) {
            passwordError = data.error;
        } else {
            todoList = data;
        }
    }


    async function updateState(todo) {
        todo.state = todo.state === 'done' ? 'todo' : 'done';

        const body = todo;
        body.password = password;

        const res = await fetch('api/todo/update/'+todo.id, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        const data = await res.json();
        todoList = todoList;
    }


    async function changePassword() {
        const body = {
            id: todoList.id,
            password,
            newPassword
        };
        const res = await fetch('api/account/setPwd', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        const data = await res.json();
        showChangePassword = false;
        password = newPassword;
    }

    async function editTitle() {
        const body = {
            id: todoList.id,
            password,
            name: todoList.name
        };

        const res = await fetch('api/account/update', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });

        const data = await res.json();
        showEditTitle = false;
    }


    async function remove(id) {
        const body = {
            id,
            password
        };

        const res = await fetch('api/todo/delete', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });

        const data = await res.json();

        todoList.todo = todoList.todo.filter(t => t.id === id ? false : true );
    }

    const [send, receive] = crossfade({
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

</script>


<div class="main" out:fly={{x: -300, y: -600}}>
    {#if todoList.error === 'password'}
        <div>
            <h2>Password protected todoList</h2>
            <label>
                Password:
                <input bind:value={password} type="password">
            </label>
            <button on:click={unlock}>Submit</button>
            {passwordError}
        </div>
    {:else if todoList.error === 'unavailable'}
        no todoList found
    {:else}

        <div>
            share your todoList: <a href={`todo/${todoList.id}`}>https://todo.xdevbox.net/todo/{todoList.id}</a>
        </div>
        
        <div class="title">
            {#if showEditTitle}
                <input bind:value={todoList.name}>
                <button on:click={editTitle}>submit</button>
            {:else}
                <h1>{todoList.name}</h1>&nbsp;
                <button on:click={() => showEditTitle = true} class="material-icons" >create</button>
            {/if}
        </div>

        <div>
            {#if showChangePassword}
                <input bind:value={newPassword} type="password">
                <button on:click={changePassword}>change</button>
            {:else}
                <button on:click={() => showChangePassword = true} class="material-icons">
                    {#if password === ''}
                        lock_open
                    {:else}
                        lock
                    {/if}
                </button>
            {/if}
        </div>


        <div class="todo-input">
            <input bind:value><button on:click={add} class="material-icons">add</button>
        </div>

        <div class="todo-list">
            <div>
                <h2>TODO</h2>
                {#each todoList.todo.filter(t => t.state === 'todo' ? true : false) as todo (todo.id)}
                    <div 
                        class="todo-item"
                        in:receive="{{key: todo.id}}"
                        out:send="{{key: todo.id}}"
                        animate:flip>
                        <div>
                            <label>
                                <input type="checkbox" checked={false} on:click={() => {updateState(todo); todo.state = 'done';}}>
                                {todo.text}
                            </label>
                        </div>
                        <button on:click={() => remove(todo.id)} class="material-icons">delete</button>
                    </div>
                {/each}
            </div>
            <div>
                <h2>DONE</h2>
                {#each todoList.todo.filter(t => t.state === 'done' ? true : false) as todo (todo.id)}
                    <div 
                        class="todo-item"
                        in:receive="{{key: todo.id}}"
                        out:send="{{key: todo.id}}"
                        animate:flip>
                        <div>
                            <label>
                                <input type="checkbox" checked on:click={() => {updateState(todo); todo.state = 'todo'}}>
                                <del>{todo.text}</del>
                            </label>
                        </div>
                        <button on:click={() => remove(todo.id)} class="material-icons">delete</button>   
                    </div>
                {/each}
            </div>
        </div>

    {/if}
</div>


<style>
    a {
        border-bottom: 2px solid #ff9100;
        text-decoration: none;
    }

    button {
        color: white;
        background: none;
        border: none;
        cursor: pointer;
    }

    button:hover {
        color: #ff9100;
    }

    input {
        font-size: 1.2em;
    }

    .main {
        
        text-align: center;
        min-height: 50vh;
        display: flex;
        flex-direction: column;
        /* justify-content: space-between; */
        align-items: center;
    }

    .title {
        display: flex;
        justify-content: center;
        align-items: baseline;
        margin-bottom: 1em;
        margin-top: 2em;
    }

    .todo-input {
        display: flex;
        justify-content: center;
        align-items: center;
        /* min-width: 50vw; */
    }

    .todo-input input {
        min-width: 20vw;
    }

    .todo-input button {
        font-size: 32px;
    }

    .todo-list {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        text-align: left;
        width: 100%;
        margin-top: 1em;
    }

    .todo-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.2em;
        margin-bottom: 0.25em;
    }

    .todo-item button {
        font-size: 24px;
    }

    del {
        text-decoration-color: black;
        text-decoration-thickness: 2px;
    }

</style>

<svelte:head>
	<title>TodoList App | {todoList.id} | Create and share Todo lists and protect them with a password</title>
</svelte:head>