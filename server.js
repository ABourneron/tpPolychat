const express = require('express')
const app = express()

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    var MonUser;
    socket.on("on", (user) => {
        io.emit('on', user + " vient de se connecter");
        MonUser = user
    })

    socket.on('chat message', (msg) => {

            io.emit('chat message', msg);
	   console.log(msg);

        
    });

    //Typing
    socket.on('typingON', (user) => {
        io.emit('typing', user + " écrit...");
    });

    socket.on('typingOFF', () => {
        io.emit('typing', " ");
    });

    socket.on('disconnect', () => {
        io.emit('off', MonUser + " s'est déconnecté...");
    });
});


http.listen(3000, () => {
    console.log('listening on *:3000');
});
