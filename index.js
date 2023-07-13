const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')

const { Server } = require('socket.io')

const server = http.createServer(app)

app.use(cors())

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

server.listen(4000, () => {
    console.log("SERVER IS RUNNING")
})

io.on('connection', (socket) => {
    console.log("Client connected ", socket.id)
    
    socket.on('NEW_ORDER', (data) => {
        console.log("new order from table ", data.table)
        socket.broadcast.emit('RECEIVED_NEW_ORDER', data.table)
    })

    socket.on('GOAL_REACHED', () => {
        console.log("GOAL REACHED")
        socket.broadcast.emit('GOAL_REACHED_CHANGE_CURRENT_ORDER')
    })
})

