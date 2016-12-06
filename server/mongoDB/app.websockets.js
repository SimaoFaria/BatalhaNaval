const io = require('socket.io');
const ws = module.exports = {};

let wsServer = null;

ws.init = (server) => {
    wsServer = io.listen(server);

    wsServer.sockets.on('connection', function (socket) {
        // TODO
        // 1a)
        socket.emit('players',Date.now()+' Welcome to battleship');
        // 1b)
        socket.broadcast.emit('players',Date.now()+"A new player has arrived");
        // 3)
        socket.on('chat',(data) => {
            wsServer.emit('chat',data);
        })
    });
};

ws.notifyAll = (channel, message) => {
    wsServer.sockets.emit(channel, message);
};




