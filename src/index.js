const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
//middlewares sử dụng để đọc các http request PUT và DELETE
const methodOverride = require('method-override');
const path = require('path');
const sortMiddleware = require('./app/middlewares/SortMiddleware');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); //Thiết lập gói cookie-parser
const route = require('./routes/index.js');

//use cookie-parser
app.use(cookieParser());
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
        helpers: require('./helper/handleBars.js')
    }),

);
//set up Global configuration access
dotenv.config();



app.set('view engine', 'hbs');
app.set('views',
    path.join(__dirname,
        'resources/views'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//Route init
route(app);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


