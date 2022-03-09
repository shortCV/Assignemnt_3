const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;


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

//initialize points
let points = 0;
let room1_p = 0;
let room2_p = 0;

io.on('connection', (socket) => {
    console.log(socket.id + ' is connected');

    //enemy
    socket.on('circle', (data) => {
        console.log('enemy event received');
        //count hits the enemy has taken
        console.log(points++)
        console.log('', points);

        //call to change enemy health 
        io.sockets.emit('change_point', {points});

        //if the enemy has been hit ten times, it is defeated, thus goes invisible
        if(points >= 10){
            console.log('invisible event');
            io.sockets.emit('invisible');   //invisible code 
            io.sockets.emit('final_goal_1', {room1_p, room2_p});    //call to see if room 1 has won or lost
            io.sockets.emit('final_goal_2', {room1_p, room2_p});    //call to see if room 2 has won or lost
        };

    });

    socket.on('room1_points', (data) => {
        //count amount of points the player is getting 
        console.log(room1_p++)
        console.log('', room1_p);

        //showcase points to player
        io.emit('client_points_2', {room1_p});

    });

    socket.on('room2_points', (data) => {
        //count amount of points the player is getting
        console.log(room2_p++)
        console.log('', room2_p);

        //showcase points to player
        io.emit('client_points', {room2_p});

    });

    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
    });
    

});