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
    const { page, session } = stores();

    export let todoList;
    export let listId;


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


    async function delTodo(i, id) {
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

        todoList.todo.splice(i, 1);
        todoList.todo = todoList.todo;
    }

</script>

<div>
    {#if todoList.error === 'password'}
        <h2>Password protected todoList</h2>
        <label>
            Password:
            <input bind:value={password} type="password">
        </label>
        <button on:click={unlock}>Submit</button>
        {passwordError}
    {:else if todoList.error === 'unavailable'}
        no todoList found
    {:else}
        link to your todoList: <a href={`todo/${todoList.id}`}>https://todo.xdevbox.net/todo/{todoList.id}</a>
        <!-- {JSON.stringify(todoList)} -->
        <div>
            {#if showChangePassword}
                <input bind:value={newPassword} type="password">
                <button on:click={changePassword}>change</button>
            {:else}
                <button on:click={() => showChangePassword = true}>change password</button>
            {/if}
        </div>

        <div class="main">

            <div class="title">
                {#if showEditTitle}
                    <input bind:value={todoList.name}>
                    <button on:click={editTitle}>submit</button>
                {:else}
                    <h1>{todoList.name}</h1>&nbsp;
                    <button on:click={() => showEditTitle = true} >edit</button>
                {/if}
            </div>

            <input bind:value><button on:click={add}>add</button>

            <div class="todo-list">
                <div>
                    <h2>todo</h2>
                    {#each todoList.todo as todo, i}
                        {#if todo.state === 'todo'}
                            <div class="todo-item">
                                <div>
                                    <label>
                                        <input type="checkbox" checked={false} on:click={() => {updateState(todo); todo.state = 'done';}}>
                                        {todo.text}
                                    </label>
                                </div>
                                <button on:click={() => delTodo(i, todo.id)}>X</button>
                            </div>
                        {/if}
                    {/each}
                </div>
                <div>
                    <h2>done</h2>
                    {#each todoList.todo as todo, i}
                        {#if todo.state === 'done'}
                            <div class="todo-item">
                                <div>
                                    <label>
                                        <input type="checkbox" checked on:click={() => {updateState(todo); todo.state = 'todo'}}>
                                        {todo.text}
                                    </label>
                                </div>
                                <button on:click={() => delTodo(i, todo.id)}>X</button>
                            </div>
                        {/if}
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    a {
        border-bottom: 2px solid #ff9100;
        text-decoration: none;
    }

    .main {
        text-align: center;
    }

    .title {
        display: flex;
        justify-content: center;
        align-items: baseline;
        margin-bottom: 1em;
    }

    .todo-list {
        display: flex;
        justify-content: space-evenly;
        text-align: left;
    }

    .todo-item {
        display: flex;
        justify-content: space-between;
    }

    .todo-item button {
        border: none;
        background-color: white;
        cursor: pointer;
    }
</style>