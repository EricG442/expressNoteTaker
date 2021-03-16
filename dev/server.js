const express = require('express');
const path = require('path');

const pubDIR = path.join(__dirname, './public');


const htmlRoutes = require('./routes/htmlRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');

const PORT = process.env.PORT || 3000;

const app = express();

app.use('/static', express.static(pubDIR));

app.use('/api', apiRoutes);
app.use(htmlRoutes);

app.listen(PORT, (err) => {
    if(err) {console.log(err)}
    else {console.log(`Listening to port: ${PORT}`)}
})