import { collections } from "../../../../db";
import { rndHash } from "../../../../hash";

export async function post(req, res) {
    // const { list } = req.params;
    // console.log(list);
    // console.log(req.body);
    const { list, text, state, password } = req.body;

    const accounts = collections.accounts;

    const todoList = accounts.findOne({id: list});

    if (todoList !== null) {
        if (todoList.password === password) {
            const todos = collections.todos;

            let todoId;
            let todo;

            do {
                todoId = rndHash(6);
                todo = todos.findOne({id: todoId});
            }
            while ( todo !== null );

            todo = {
                id: todoId,
                list,
                text,
                state,
                created: new Date()
            };

            const insert = todos.insert(todo);

            res.end(JSON.stringify(insert));
        } else {
            res.end('{"error": "unavailable"}');
        }
    } else {
        res.end('{"error": "unavailable"}');
    }


    res.end();
}