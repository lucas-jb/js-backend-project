const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use('/assets', express.static(path.join(__dirname, 'assets'),{
    etag: false,
    maxAge: '5h'
}));

app.get('/', (req,res)=>{
    res.render('index');
});

app.listen(3300);