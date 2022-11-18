const io = require('socket.io-client');

let socket = io.connect('http://localhost:3300',{reconnect: true});

socket.on('connect', ()=>{
    console.log("\n\nSocket connected from NodeJS\n\n")
})

module.exports = socket;