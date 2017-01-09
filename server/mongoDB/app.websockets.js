const io = require('socket.io');
const ws = module.exports = {};

var wsServer = null;

ws.init = (server) => {
    wsServer = io.listen(server);

    wsServer.sockets.on('connection', function (socket) {
        
        console.log('a user connected');


        socket.on('join game channel',(json) => {

            // console.log('rooms');
            // console.log(socket.rooms);
            socket.join(json.chatChannel);
            socket.join(json.notificationsChannel);
            // console.log(socket.rooms);

            // console.log("socket.rooms");
            // console.log(socket.rooms);

            
            // works
            socket.emit(json.notificationsChannel, 'Welcome user ' + json.user.username + '.');
            socket.to(json.notificationsChannel).broadcast.emit(json.notificationsChannel, 'User ' + json.user.username + ' connected.');

        })
 
        socket.on('join game room',(json) => {

            socket.join(json);
            // console.log(json);
        })

        socket.on('leave game channel',(json) => {
            socket.leave(json.chatChannel);
            socket.leave(json.notificationsChannel);
        })

        socket.on('use chat',(channel, json) => {
            let msg = json.message; 
            
            // global para todos naquele channel
            // funciona
            // json.message = msg + '-' + 'wsServer.emit(channel, json)';
            // wsServer.emit(channel, json);

            // envia só para os clients do channel
            // funciona
            // json.message = msg + '-' + 'socket.to(channel).emit(channel, json)';
            // socket.to(channel).emit(channel, json);
            
            // envia só para os clients do channel
            // funciona
            // json.message = msg + '-' + 'socket.to(channel).broadcast.emit(channel, json)';
            // json.message = '- outro - ' + msg;
            socket.to(channel).broadcast.emit(channel, json);

                        // so para o client-sender
            // funciona
            // json.message = msg + '-' + 'socket.emit(channel, json)';
            // json.message = '- eu - ' + msg;
            json.user.username = '';
            socket.emit(channel, json);
            

        })

        socket.on('use notifications',(channel, json) => {
            
            // console.log("USE NOTIFICATIONS")
            // console.log(channel)
            // console.log(json)
            // console.log("/USE NOTIFICATIONS")

            // envia só para os clients do channel
            socket.to(channel).broadcast.emit(channel, json.othersMessage);

            // so para o client-sender
            socket.emit(channel, json.myMessage);
        })

        socket.on('change game state',(channel, games) => {

            // console.log("CHANGE STATE")
            // console.log(channel)
            // console.log(games)
            // console.log("/CHANGE STATE")
            socket.to(channel).broadcast.emit('change game state', games);
        })

        socket.on('update current player',(channel, updatedCurrentPlayer) => {
            socket.to(channel).broadcast.emit('update current player', updatedCurrentPlayer);
        })
        
        socket.on('update game status',(channel, updatedGameStatus) => {
            socket.to(channel).broadcast.emit('update game status', updatedGameStatus);
        })

        socket.on('disconnect', function(){
            console.log('a user disconnected');
        });
    });

    // wsServer.sockets.on(eventName, function (socket) {
        
    // });
};

ws.notifyAll = (channel, message) => {
    wsServer.sockets.emit(channel, message);
};




