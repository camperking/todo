import { collections } from "../../../db";
import { rndHash } from "../../../hash";



export async function get(req, res) {
    const accounts = collections.accounts;
    const { listId } = req.params;

    if (listId === 'new') {

        let id;
        let account; 
        
        do {
            id = rndHash(6);
            account = accounts.findOne({id});
        }
        while ( account !== null );

        
        const todoList = {};
        todoList.id = id;
        todoList.name = 'new TodoList';
        todoList.password = '';
        todoList.created = new Date();
        
        accounts.insert(todoList);

        todoList.todo = [
            {
                text: 'add todo items',
                state: 'todo',
                id: rndHash(6),
                list: id
            },
            {
                text: 'set password protection',
                state: 'todo',
                id: rndHash(6),
                list: id
            },
            {
                text: 'create new todo list',
                state: 'done',
                id: rndHash(6),
                list: id
            }
        ];

        res.end(JSON.stringify(todoList))

    } else {
        const account = accounts.findOne({id: listId});
        if (account !== null) {
            if (account.password !== '') {
                res.end(`{"error": "password", "id": "${listId}"}`);
            } else {

                const todos = collections.todos;
                const todoList = todos.find({list: account.id});
                account.todo = todoList;
                res.end(JSON.stringify(account));
            }
        } else {
            res.end('{"error": "unavailable"}');
        }
    }
}

export async function post(req, res) {
    const { listId } = req.params;

    const password = req.body.password;

    const accounts = collections.accounts;

    const list = accounts.findOne({id: listId});

    if (list !== null) {

        if (list.password === password) {

            const todos = collections.todos;

            const todoList = todos.find({list: listId});

            list.todo = todoList === null ? [] : todoList;

            const response = {...list};
            delete response.password;

            res.end(JSON.stringify(response));
        } else {
            res.end('{"error": "unavailable"}');
        }

    } else {
        res.end('{"error": "unavailable"}');
    }
}
