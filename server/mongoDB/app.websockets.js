const io = require('socket.io');
const ws = module.exports = {};

let wsServer = null;

ws.init = (server) => {
    wsServer = io.listen(server);

    wsServer.sockets.on('connection', function (socket) {
        
        console.log('a user connected');
        
        // // TODO
        // // 1a)
        // socket.emit('players',Date.now()+' Welcome to battleship');
        // // 1b)
        // socket.broadcast.emit('players',Date.now()+"A new player has arrived");
        // // 3)
        // socket.on('chat',(data) => {
        //     wsServer.emit('chat',data);
        // })        


        // io.sockets.to('game').emit('msg', obj_to_send);
        // io.to('game').emit('msg', obj_to_send);
        // socket.broadcast.to('game').emit('msg', obj_to_send);
        // socket.to('game').emit('msg', obj_to_send);


        socket.on('join game channel',(json) => {

            // console.log('rooms');
            // console.log(socket.rooms);
            socket.join(json.chatChannel);
            socket.join(json.notificationsChannel);
            // console.log(socket.rooms);

            // console.log("socket.rooms");
            // console.log(socket.rooms);

            //BUG not working!!!
            // socket.to(json.notificationsChannel).emit('notifications', 'Welcome user ' + json.user.username + '.');
            // socket.broadcast.to(json.notificationsChannel).emit('notifications', 'A new user connected.');
            
            // works
            socket.emit(json.notificationsChannel, 'Welcome user ' + json.user.username + '.');
            socket.to(json.notificationsChannel).broadcast.emit(json.notificationsChannel, 'User ' + json.user.username + ' connected.');

            //TODO tirar depois das linhas acima passarem a funcionar
            //wsServer.emit(json.notificationsChannel, 'Welcome user ' + json.user.username + '.');
            
            //TODO ver situações que façam o user sair do channel
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
            
            // nao funcionam
            // json.message = msg + '-' + 'socket.to(channel).emit("chat", json)';
            // socket.to(channel).emit('chat', json);
            // json.message = msg + '-' + 'socket.broadcast.to(channel).emit("chat", json)';
            // socket.broadcast.to(channel).emit('chat', json);
        })

        socket.on('use notifications',(channel, json) => {
            
            console.log("USE NOTIFICATIONS")
            console.log(channel)
            console.log(json)
            console.log("/USE NOTIFICATIONS")

            // envia só para os clients do channel
            socket.to(channel).broadcast.emit(channel, json.othersMessage);

            // so para o client-sender
            socket.emit(channel, json.myMessage);
        })

        socket.on('disconnect', function(){
            
            //TODO DUVIDA
            //é necessário fazer o leave dos rooms ou nem por isso?

            // nao funka, TODO perguntar prof o porquê no on disconnect o socket não ter rooms
            // console.log("socket.rooms");
            // console.log(socket.rooms);
            // var channel; 
            // socket.rooms.forEach((room) => {
            //     //existe sempre um devido ao construtor
            //     if(room.indexOf('notifications') !== -1) {
            //         channel = room;
            //     }    
            // });
            // json = {
            //     //TODO como obter o username aqui?
            //     othersMessage: 'Player TODO has disconnected'
            // }
            // // envia só para os clients do channel
            // socket.to(channel).broadcast.emit(channel, json.othersMessage);

            console.log('a user disconnected');
        });
    });

    // wsServer.sockets.on(eventName, function (socket) {
        
    // });
};

ws.notifyAll = (channel, message) => {
    wsServer.sockets.emit(channel, message);
};




