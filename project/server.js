const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const session = require('express-session');

const socketio = require('socket.io');

const app = express();

const tasksRoutes = require('./routes/tasks_routes');
const registrationsRoutes = require('./routes/registrations_routes');
const sessionsRoutes = require('./routes/sessions_routes');
const categoriesRoutes = require('./routes/categories_routes');

const findUserMiddleware = require('./middleware/find_user');
const authUser = require('./middleware/auth_user');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'pug');

app.use(session({
    secret:['rkdD=!AZp24_YPu2Z-O"As+h%s^k\c','"E$:KiMOeJdX"ZM%;QiM66YA+gFurG'],
    saveUninitialized: false,
    resave: false
}));

app.use(findUserMiddleware);
app.use(authUser);

app.use(tasksRoutes);
app.use(registrationsRoutes);
app.use(sessionsRoutes);
app.use(categoriesRoutes);


app.get('/', (req,res)=>{
    res.render('home', {user: req.user});
})

let server = app.listen(3300);
let io = socketio(server);

let usersCount = 0;
io.on('connection',(socket)=>{
    usersCount++;

    io.emit('count_updated',{count: usersCount})

    socket.on('disconnect',()=>{
        usersCount--;
    })
})