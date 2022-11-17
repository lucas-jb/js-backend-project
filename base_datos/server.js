const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();
const tasksRoutes = require('./routes/tasks_routes');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'pug');

app.use(tasksRoutes);

app.listen(3300);