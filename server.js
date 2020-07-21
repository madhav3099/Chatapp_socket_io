const express = require('express')
const http = require('http')
const app = express()
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('connected with socket id = ' + socket.id)

    socket.on('login',(data) => {
        socket.join(data.username)
        socket.emit('logged_in')
    })
   
    socket.on('msg_send',(data) => {
        if(data.to){
            io.to(data.to).emit('msg_recvd',data)
        }else{
            socket.broadcast.emit('msg_recvd',data)
        }
    })
    
})


app.use('/',express.static(__dirname + '/public'))

server.listen(2123,() => {
    console.log('server started')
})