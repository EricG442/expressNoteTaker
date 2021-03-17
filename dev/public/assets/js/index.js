const saveButton = $('#saveBtn'),
    listContainer = $('#list-container'),
    noteTitle = $('.note_title'),
    noteText = $('.note_textarea'),
    newNoteBtn = $('#newNoteBtn');

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

const renderNoteText = note => {
    if(note.id) {
        noteTitle.val(note.title);
        noteText.val(note.text);
    }else {
        noteTitle.val('');
        noteText.val('');
    }
};

const handleRender = function() {
    let newNote = $(this).data();
    renderNoteText(newNote);
};

const renderNewNote = () => {
    renderNoteText();
};

const handleSaveNote = () => {
 
    if(noteTitle.val().trim()) {
        let params = {
            title: noteTitle.val(),
            text: noteText.val()
        }
        
        saveNotes(params);
    }else {
        // some type of error handling response needs to go here
        console.log('need a note title to save');
    }

    getAndRender();
};

const handleDelNote = function (e) {
    e.stopPropagation();

    let parent = $(this).parent().data();
    // need to finish handling the delete event later finally have something that responds is better
    // this will call the deleteNote funtion and send a POST request and i will finish that later
    deleteNote(parent.id);

    getAndRender();
};

const renderNoteList = notes => {
    listContainer.empty();
    let listItems = [];

    const createLi = (title, withDelBtn = true) => {
        let li = $("<li class='list-group-item'>"),
            span = $("<span>").text(title);

        li.append(span);

        if(withDelBtn) {
            let delBtn = $("<i class='fas fa-trash-alt text-danger delete-note' style='float: right;'>");
            li.append(delBtn);
        }
        return li
    };

    notes.forEach( note => {
        const card = createLi(note.title).data(note);
        listItems.push(card);
    } );

    listContainer.append(listItems);
};

const getAndRender = () => {
    return getNotes().then(renderNoteList);
};

newNoteBtn.on('click', renderNoteText);
listContainer.on('click', '.list-group-item', handleRender);
listContainer.on('click', '.delete-note', handleDelNote);
saveButton.on('click', handleSaveNote);

getAndRender();