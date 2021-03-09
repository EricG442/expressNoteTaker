const express = require('express');

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
    res.sendFile()
})

app.listen(PORT, (err) => {
    if(err) {console.log(err)}
    else {console.log(`Listening to port: ${PORT}`)}
})