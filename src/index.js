const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const port = 3000;

const route = require('./routes/index.js');


//connect db
const db = require('./config/db/index.js');
//connect to Db
db.connectDB();
//HTTP logger
// app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
//template engine

//config template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
);

app.set('view engine', 'hbs');
app.set('views',
     path.join(__dirname, 
        'resources/views'));

//Route init
route(app);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


