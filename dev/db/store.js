const path = require('path');
const fs = require('fs');
const util = require('util');
const {v1: uuidv1} = require('uuid');

const dbPath = path.join(__dirname, './db.json');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    getPath()  {
        return dbPath;
    }
    
    read() {
        return readFileAsync(dbPath, 'utf-8');
    }

    write(content) {
        return writeFileAsync(dbPath, content);
    }

    getNotes(res) {
        this
            .read()
            .then(data => res.json(JSON.parse(data)));
    }

    saveNotes(notes) {

    }

    addNote(note) {
        const db = this.read();

        console.log(db);
    }

    deleteNote(noteID) {

    }
};

module.exports = new Store;  