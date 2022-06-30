import './App.css';
import Board from "./components/board/Board";
import IssueBar from "./components/issue/IssueBar";
import React, {useEffect, useState} from "react";
import socket from "./socket";
import UserPlace from "./components/board/UserPlace";
import {initUser, ROOM_NAME} from "./services/Helper";
import Users from "./components/Users";

const App = () => {
    const [room, setRoom] = useState(null)

    useEffect(() => {
        let {name, key} = initUser()
        socket.emit('join', {name, key, room: ROOM_NAME})
        socket.on('add_vote', data => setRoom(data))
        socket.on('leave_room', data => setRoom(data))
        socket.on('join', data => setRoom(data))
        socket.on('add_issue', data => setRoom(data))
        socket.on('add_vote', data => setRoom(data))
        socket.on('set_vote', data => setRoom(data))
    }, [])

    return (
        room && <div className="App">
            <Users room={room}/>
            <Board room={room}/>
            <IssueBar room={room} setRoom={setRoom}/>
        </div>
    );
}

export default App;
