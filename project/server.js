const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();

const tasksRoutes = require('./routes/tasks_routes');
const registrationsRoutes = require('./routes/registrations_routes');
const sessionsRoutes = require('./routes/sessions_routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'pug');

app.use(session({
    secret:['rkdD=!AZp24_YPu2Z-O"As+h%s^k\c','"E$:KiMOeJdX"ZM%;QiM66YA+gFurG'],
    saveUninitialized: false,
    resave: false
}));

app.use(tasksRoutes);
app.use(registrationsRoutes);
app.use(sessionsRoutes);

app.listen(3300);