const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));


let db = new sqlite3.Database('js-backend-project');

app.post('/pendientes', (req,res)=>{
    db.run(`INSERT INTO tasks(description) VALUES(?)`,req.body.description);
    res.send('Inserción finalizada')
});

app.listen(3300);

process.on('SIGINT', ()=>{
    console.log('Server closed.');
    db.close();
    process.exit();
})