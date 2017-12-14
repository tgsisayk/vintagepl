var  express = require('express')
var path = require('path');
var passport = require('passport')
const logger = require('morgan');

var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser')
var session      = require('express-session');

var app = express()
var server = require('http').createServer(app);
var router = express.Router();
var routerSecure = express.Router();
app.use(express.static(path.resolve('static')))


app.use(cookieParser("secret"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
     secret: 'VINTAGEVERYVINTAGE',
     secure: true,
     resave: false,
     saveUninitialized: false,
    cookie: {
        originalMaxAge:null, httpOnly:true
    }
}));
app.use(logger('dev'));
app.use(function logErrors(err, req, res, next) {
        console.error(err.stack);
        next(err);

    }
);



server.listen(3011,null, null, () => console.log('VintagePL app listening on port 3011!'))

app.get('/', (req, res) => res.sendFile(path.resolve('index.html')))
app.get('/team', (req, res) => res.sendFile(path.resolve('team.html')))
app.get('/schedule', (req, res) => res.sendFile(path.resolve('schedule.html')))
app.get('/sitemap', (req, res) => res.sendFile(path.resolve('sitemap.html')))
app.get('/login', (req, res) => res.sendFile(path.resolve('login.html')))
app.get('/admin',(req, res) => res.sendFile(path.resolve('admin.html')))

app.use('/', router)
app.use('/', routerSecure)
require('./routes')(router, routerSecure);
require('./config/passport')(passport);
