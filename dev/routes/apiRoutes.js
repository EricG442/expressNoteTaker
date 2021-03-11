const router = require('express').Router();
const store = require('../db/store.js');

router.get('/notes', (req, res) => {
    store.getNotes().then(data => {
        res.json(data);
    })
});

router.post('/notes', (req, res) => {
    store.addNote(req.body)
        .then(note => {
            res.json(note);
        })
});

router.delete('/notes/:id', (req, res) => {
    store.deleteNote(req.params.id)
        .then(() => res.json({ok: true}))
});

module.exports = router;