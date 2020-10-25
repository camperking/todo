import { collections } from "../../../../db";

export async function post (req, res) {
    const { id, list, state, password } = req.body;

    const lists = collections.accounts;

    const todoList = lists.findOne({id: list});

    if (todoList !== null) {
        if (todoList.password === password) {
            const todos = collections.todos;
            const todo = todos.findOne({id});
            //todo.state = 'done';
            todo.state = state;
            todos.update(todo);
            res.end(JSON.stringify(todo));
        } else {
            res.end('{"error": "unavailable"}');    
        }
    } else {
        res.end('{"error": "unavailable"}');
    }

}