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

app.get( '/join', function( req, res ){ 
    res.sendFile( __dirname + '/public/2D.html' );
});

/*app.get( '/3D', function( req, res ){ 
    res.sendFile( __dirname + '/public/3D.html' );
});*/

//socket.io / websockets stuff

io.on('connection', (socket) => {
    console.log(socket.id + ' is connected');

    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
    });

    socket.on('circle', (data) => {
        console.log('enemy event received');
        /*points++;
        console.log(points);

        const Context_AF = this;
        Context_AF.enemyAttack      = document.querySelector('#enemy');
        Context_AF.enemyAttack.setAttribute("visible",true, {dur:Context_AF.data.duration, enabled:true});

        if(points >= 3){
            Context_AF.enemyAttack.setAttribute("visible", false, {enabled:false});
        }*/

        //io.sockets.emit('point_collect', {points});
    });

});