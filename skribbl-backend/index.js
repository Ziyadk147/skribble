const { Server } = require('socket.io');

const io = new Server({
    cors: "http://localhost:5173"
});


io.on('connection' , function (socket) {
  socket.on("canvasImage", (data) => {
    console.log("Broadcasting canvasImage...");
    socket.broadcast.emit('canvasImage', data);
});
})


io.listen(5000);    
console.log(io);