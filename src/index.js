const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

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

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed')
        }

        io.emit('message', message)
        callback()
    })

    socket.on('sendLocation', ({ latitude, longitude } = {}, callback) => {
        io.emit('locationMessage', `https://google.com/maps?q=${latitude},${longitude}`)

        callback('Location shared!')
    })

    socket.on('disconnect', () => {
        io.emit('message', 'User has left')
    })
})

server.listen(port, () => {
    console.log('Server is up on port ' + port)
})