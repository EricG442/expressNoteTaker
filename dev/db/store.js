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

    getNotes() {
        return this
                .read()
                .then(data => {
                    return data ? JSON.parse(data) : [];
                });
    }

    saveNotes(notes) {
        return this.write(JSON.stringify(notes))
    }

    addNote(note) {
        return this
                .getNotes()
                .then(data => {
                    const newNote = {...note, id: uuidv1()}
                    data.push(newNote);

                    return this.saveNotes(data);
                })
    }

    deleteNote(noteID) {
        return this
                .getNotes()
                .then(data => {
                    const list = data.filter(note => note.id !== noteID);
                    this.saveNotes(list);
                })
    }
};

module.exports = new Store;  