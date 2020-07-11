const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))

//io.on runs according to the number of connections
io.on('connection', (socket) => {
    console.log('New Websocket connection')
    // broadcast emits event to all except this particular socket
    socket.broadcast.emit('message', 'A new user has joined!')
    
    socket.emit('message', 'Welcome!')
    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        io.emit('message', 'User has left')
    })
})

server.listen(port, () => {
    console.log('Server is up on port ' + port)
})