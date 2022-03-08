const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8081;


server.listen(LISTEN_PORT);
app.use(express.static(__dirname + '/public')); //set root path of server ...
console.log("Listening on port: " + LISTEN_PORT );


//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/room1', function( req, res ){ 
    res.sendFile( __dirname + '/public/room1.html' );
});

app.get( '/room2', function( req, res ){ 
    res.sendFile( __dirname + '/public/room2.html' );
});

//socket.io / websockets stuff
let points = 0;
let fucker = 0;


io.on('connection', (socket) => {
    console.log(socket.id + ' is connected');


    socket.on('circle', (data) => {
        console.log('enemy event received');
        console.log(points++)
        console.log('', points);

        io.sockets.emit('change_point', {points});

        if(points >= 10){
            console.log('invisible event');
            io.sockets.emit('invisible');
        };

    });

    socket.on('fuck', (data) => {
        console.log('fuck event received');
        console.log(fucker++)
        console.log('', fucker);

        //io.emit('change_point', {fucker});

    });

    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
    });
    

});