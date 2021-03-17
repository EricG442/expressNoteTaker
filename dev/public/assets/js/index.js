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
    // check if theres an id givin to the method, if not set the value or text content of the note title and note body
    if(note.id) {
        noteTitle.val(note.title);
        noteText.val(note.text);
    }else {
        noteTitle.val('');
        noteText.val('');
    }
};

const handleRender = function() {
    // using 'this' syntax to get the note title and body in the data attribute then render the note
    let newNote = $(this).data();
    renderNoteText(newNote);
};

const handleSaveNote = () => {
    
    // checking if the note title is not empty, if it is it just logs an error to the console, need to complete it a bit more
    // if the note title is not empty call the method using the note as a parameter to send a POST request with ajax
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

    // using 'this' syntax again to get the parent elements data attribute using jquery, 
    //then give the id property to the deleteNote method to send a DELETE request using ajax
    let parent = $(this).parent().data();
    deleteNote(parent.id);

    // finally display notes
    getAndRender();
};

const renderNoteList = notes => {
    // empty the note list container and set up a new array for the forEach method to input into
    listContainer.empty();
    let listItems = [];

    // this method is used to create the html elements to use and append to the page, needs a title parameter and withDelBtn is true 
    // by default and appends a delete button to the list item
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

    // uses the array passed to the method and for each index use the above method 'createLi' and set the data attribute to the index contents
    // finally push the new html element to the array to then have the array be appended to the container
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