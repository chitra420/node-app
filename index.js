const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io')
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        method:["GET","POST"]
    }
})

io.on('connection',(socket)=>{
    socket.on("join_room",(roomId)=>{
        socket.join(roomId)
    })

    socket.on('send_message',(data)=>{
       socket.to(data.room).emit('receive_msg',data);
    })

    socket.on('disconnect',()=>{
        console.log('disconnected '+socket.id)
    })
})

server.listen(3001,()=>{
    console.log('server running');
})