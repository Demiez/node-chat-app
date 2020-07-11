const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)d

const port = process.env.PORT || 3000
const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))

//io.on runs according to the number of connections
io.on('connection', (socket) => {
    console.log('New Websocket connection')
    
    socket.emit('message', 'Welcome!')
    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })
})

server.listen(port, () => {
    console.log('Server is up on port ' + port)
})