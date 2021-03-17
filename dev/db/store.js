const path = require('path');
const fs = require('fs');
const util = require('util');
const {v1: uuidv1} = require('uuid');

// getting the db.json file path here so that there a no scope issues within the Store class
const dbPath = path.join(__dirname, './db.json');

// creating new methods of the readFile and writeFile from the fs package which returns a promise
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