const express = require('express')
const {Server} = require('socket.io')
const http = require("http")
const cors = require('cors')
const mongoose = require("mongoose")
require('dotenv').config()

const IssueRoutes = require("../src/issue/IssueRoutes")
const RoomRoutes = require("../src/room/RoomRoutes")

const RoomEvent = require("../src/room/RoomEvent")
const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {origin: process.env.CLIENT_H0ST, methods: ["GET", "POST"], credentials: true}
})

app.use(cors({origin: process.env.CLIENT_H0ST, credentials: true}));
app.use('/issue', IssueRoutes)
app.use('/room', RoomRoutes)


io.on('connection', socket => {
    RoomEvent.join(socket)
    RoomEvent.disconnecting(socket)
    RoomEvent.addIssue(socket)
    RoomEvent.addVote(socket)
    RoomEvent.setVote(socket)
})

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        server.listen(5000, () => console.log("SERVER started on port 5000"))
    } catch (e) {
        console.log('---SERVER ERROR---', e)
    }
}

start()
