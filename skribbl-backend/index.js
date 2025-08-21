const { Server } = require('socket.io');
const { defaultRandomWords } = require('./constants/constants');
const {generateSpacesForSelectedWord, getSpacifiedWord} = require('./helpers/helper')
const io = new Server({
    cors: "http://localhost:5173"
});

let currentCanvas = null;
let gamePlayers = [];
let messageLog = [];
let gameSettings = {
    numPlayers: 0,
    drawTime:0,
    rounds:0,
    customWords:""

};
io.on('connection', function (socket) {
    console.log("NEW CLIENT CONNECTED " , socket.id);
    io.emit('currentPlayers' , gamePlayers)
    if(currentCanvas){
        socket.emit('canvasImage' , currentCanvas)
    }
    socket.on("playerJoin" , (data) => {
        let playerData = {
            name: data.name,
            socketid: socket.id,
            isOwner: false,
        }
        if(gamePlayers && gamePlayers.length === 0 ){
            console.log(gamePlayers)
            playerData.isOwner = true  
        }
        gamePlayers = [...gamePlayers ,playerData]
        console.log("PLAYER JOINED , current Players" , gamePlayers )
        io.emit("playerJoin" , playerData);
    })
    socket.on("updateGameSettings" , (data) => {
        gameSettings = data;
        io.emit("gameSettingsUpdate" , {gameSettings})
    });
    socket.on('gameStarted' , (data) => {
        io.emit("gameStarted" , data);
        console.log("game started ")
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

    socket.on("sendMessage", (data) => {
        console.log(data);
        const messageData = {
            senderName: data.name,
            socketid: socket.id,
            message: data.message
        };

        messageLog.push(messageData);

        // Send only the new message to all connected clients
        io.emit("messageUpdate", messageData);
    });
    socket.on("generateWord" , (data) => {
        console.log("Generating word...")
        io.emit('wordUpdate' , getSpacifiedWord());
    })

    socket.on("correctGuessed" , (data) => {
    //   let playerIndex  = gamePlayers.findIndex((item) => item.socketid === data.socketid);
    //   if(playerIndex !== -1){
    //     gamePlayers[playerIndex] = data;      
    //   }
      io.emit("playerGuessedCorrectly" , data ) 
    })
})


io.listen(5000);
console.log(io);