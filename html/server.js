const express = require('express');
const path = require('path');

const app = express();


app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req,res)=>{
    res.sendFile('index.html',{
        root: __dirname
    }); 
});

app.listen(3300);