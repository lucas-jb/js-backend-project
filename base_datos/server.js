const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const sequelize = new Sequelize('js-backend-project', null, null, {
    dialect: 'sqlite',
    storage: './js-backend-project'
});
let db = new sqlite3.Database('js-backend-project');

app.post('/pendientes', (req,res)=>{
    //db.run(`INSERT INTO tasks(description) VALUES(?)`,req.body.description);
    //res.send('Inserción finalizada')
});

app.listen(3300);