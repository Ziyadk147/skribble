const { Server } = require('socket.io');

const io = new Server({
    cors: "http://localhost:5173"
});

let currentCanvas = null;
let gamePlayers = [{}];

io.on('connection', function (socket) {
    console.log("NEW CLIENT CONNECTED " , socket.id);
    if(currentCanvas){
        socket.emit('canvasImage' , currentCanvas)
    }
    socket.on("playerJoin" , (data) => {
        gamePlayers = [...gamePlayers , {
            name: data.name,
        }]
        socket.broadcast.emit("playerJoin" , data);
    })
    socket.on("canvasImage", (data) => {
        currentCanvas = data;
        console.log("Broadcasting canvasImage...");
        socket.broadcast.emit('canvasImage', data);
    });
})


io.listen(5000);
console.log(io);