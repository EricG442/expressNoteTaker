const router = require('express').Router();
const path = require('path');

const sendFile = (res, filePath) => {
    res.sendFile(path.join(__dirname, filePath));
};

router.get('/', (req, res) => {
    sendFile(res, '../views/index.html');
});

router.get('/notes', (req, res) => {
    sendFile(res, '../views/notes.html');
});

router.get('*', (req, res) => {
    sendFile(res, '../views/index.html'); 
});

module.exports = router;