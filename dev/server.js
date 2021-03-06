const express = require('express');
const path = require('path');

const htmlRoutes = require('./routes/htmlRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/static', express.static(path.join(__dirname, './public')));

app.use('/api', apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, (err) => {
    if(err) {console.log(err)}
    else {console.log(`Listening to port: ${PORT} \nhttp://localhost:3000`)}
})