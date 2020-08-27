let express = require('express');
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server listening to port: ${port}`)
});


io.on('connect', (socket) => {
    // let addedUser = false;
    
    // console.log('user connected', socket.client);

    socket.on('add user', (username) => {
        console.log('ADD USER: ', username);
        socket.username = username;
        socket.emit('user joined', { username: socket.username });
        console.log('SOCKET EMIT USER: ', socket.username);
    });

    socket.on('message', message => {
        console.log(message);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

});

