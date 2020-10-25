import { identity } from "svelte/internal";
import { collections } from "../../../../db";

export async function post(req, res) {
    const { id, password, name } = req.body;

    const lists = collections.accounts;
    const list = lists.findOne({id});
    if (list !== null) {
        if (list.password === password) {
            list.name = name;
            lists.update(list);
            res.end('{}');
        } else {
            res.end('{"error": "unavailable"}');    
        }
    } else {
        res.end('{"error": "unavailable"}');
    }

}