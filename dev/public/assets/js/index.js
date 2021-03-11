const getNotes = () => {
    return $.ajax({
        url: '/api/notes',
        method: 'GET'
    })
};