const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
//middlewares sử dụng để đọc các http request PUT và DELETE
const methodOverride = require('method-override');
const path = require('path');
const sortMiddleware = require('./app/middlewares/sortMiddleware');
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

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
//use middleware
app.use(sortMiddleware);
//config template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            // register new function helpers
            inc(i) { return i + 1 },
            sortable: (field, sort) => {
                const currentSort = field === sort.column ?sort.type : 'default';
                const icons = {
                    default: 'bi bi-sort-alpha-down',
                    asc: 'bi bi-sort-alpha-down',
                    desc: 'bi bi-sort-alpha-up-alt'
                }
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                }
                const icon = icons[currentSort]
                const type = types[currentSort];
                return `<a href="?_sort&column=${field}&type=${type}">
                        <i class="${icon}"></i></a>`;
            }
        }
    }),

);




app.set('view engine', 'hbs');
app.set('views',
    path.join(__dirname,
        'resources/views'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//Route init
route(app);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


