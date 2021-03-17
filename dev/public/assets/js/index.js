const saveButton = $('#saveBtn'),
    listContainer = $('#list-container');

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

const renderNoteList = (notes) => {
    listContainer.empty();
    let listItems = [];

    const createLi = (title, withDelBtn = true) => {
        let li = $("<li class='list-group-item'>"),
            span = $("<span>").text(title);

        li.append(span);

        if(withDelBtn) {
            let delBtn = $("<i class='fas fa-trash-alt float-right text-danger>");
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

saveButton.on('click', getNotes());
getAndRender();