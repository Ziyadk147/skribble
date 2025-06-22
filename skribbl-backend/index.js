const { Server } = require('socket.io');

const io = new Server({
    cors: "http://localhost:5173"
});

let currentCanvas = null;
let gamePlayers = [];

io.on('connection', function (socket) {
    console.log("NEW CLIENT CONNECTED " , socket.id);
    io.emit('currentPlayers' , gamePlayers)

    if(currentCanvas){
        socket.emit('canvasImage' , currentCanvas)
    }
    socket.on("playerJoin" , (data) => {
        let playerData = {
            name: data.name,
            socketid: socket.id
        }
        gamePlayers = [...gamePlayers ,playerData]
        console.log("PLAYER JOINED , current Players" , gamePlayers )
        io.emit("playerJoin" , playerData);
    })
    socket.on("disconnect" , () => {
        const disconnectedPlayer = gamePlayers.find((item) => item.socketid === socket.id);
        
        gamePlayers = gamePlayers.filter((item) => item.socketid !== socket.id);

        if(disconnectedPlayer){
            console.log("PLAYER LEFT" , disconnectedPlayer)
            socket.broadcast.emit("playerLeft" , disconnectedPlayer);
        }
    })
    socket.on("canvasImage", (data) => {
        currentCanvas = data;
        console.log("Broadcasting canvasImage...");
        socket.broadcast.emit('canvasImage', data);
    });
})


io.listen(5000);
console.log(io);