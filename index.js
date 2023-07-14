const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')

const PORT = process.env.PORT || process.env.port || 4000

const { Server } = require('socket.io')

const server = http.createServer(app)

app.use(cors())

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://final1-repo.vercel.app', 'http://final1-repo-test.vercel.app'],
        methods: ['GET', 'POST']
    }
})

server.listen(PORT, () => {
    console.log("SERVER IS RUNNING IN ", PORT)
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

