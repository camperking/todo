import { collections } from "../../../../db";

export async function post(req, res) {
    const { id, password } = req.body;
    
    const todos = collections.todos;
    const todo = todos.findOne({id});

    if (todo !== null) {
        const lists = collections.accounts;
        const list = lists.findOne({id: todo.list});

        if (list !== null) {
            if (list.password === password) {
                todos.remove(todo);
                res.end('{}');
            } else {
                res.end('{"error": "unavailable"}');
            }
        } else {
            res.end('{"error": "unavailable"}');    
        }
    } else {
        res.end('{"error": "unavailable"}');
    }
}