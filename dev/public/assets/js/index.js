const getNotes = () => {
    return $.ajax({
        url: '/api/notes',
        method: 'GET'
    })
};

const saveNotes = someNote => {
    return $.ajax({
        url: '/api/notes',
        data: someNote,
        method: 'POST'
    });
};

const deleteNote = id => {
    return $.ajax({
        url: 'api/notes/' + id,
        method: 'DELETE'
    });
};