import { collections } from "../../../../db";

export async function post(req, res) {
    const { id, password, newPassword } = req.body;

    const lists = collections.accounts;

    const list = lists.findOne({id});

    if (list !== null) {
        if (list.password === '' || list.password === password) {
            list.password = newPassword;
            lists.update(list);
            res.end('{}');
        } else  {
            res.end('{"error": "unavailable"}');
        }
    } else {
        res.end('{"error": "unavailable"}');
    }

}