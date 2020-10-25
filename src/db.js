import loki from 'lokijs';

let db;
const createCollections = ['accounts', 'todos'];
export const collections = {};

export default function dbInit() {
    return new Promise(resolve => {
        db = new loki('./todo.db', {
            autoload: true,
            autoloadCallback: () => {
                checkCollections(createCollections);
                resolve();
            },
            autosave: true,
            autosaveInterval: 10000
        });
    });
}

function checkCollections(createCollections) {
    createCollections.forEach(element => {
        collections[element] = db.getCollection(element);
        if (collections[element] === null) {
            collections[element] = db.addCollection(element);
        }
    });
}