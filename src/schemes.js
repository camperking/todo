import { string, object, array, number, boolean } from 'yup';

export const todoScheme = object().shape({
    id: string().required(),
    password: string(),
    todo: todos
});

const todos = object().shape({
    id: string()
});