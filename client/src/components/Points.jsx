import React, {useEffect, useState} from 'react';
import socket from "../socket";
import {ROOM_NAME} from "../services/Helper";

const Points = ({room}) => {
    const [points, setPoints] = useState([])

    useEffect(() => {
        setPoints(generatePoints(10))
    }, [])

    const generatePoints = (max) => {
        const result = [1, 2]
        for (let i = 1; i < max; i++) {
            result.push(result[i - 1] + result[i])
        }
        return result
    }

    const setVote = (e) => {
        socket.emit('set_vote', {
            activeIssue: room.activeIssue,
            point: e.target.innerText,
            userKey: localStorage.getItem('plan_key'),
            room: ROOM_NAME
        })
    }

    return room.activeIssue && <div id={`points`}>
        {points.map(point => <button key={point} className={`point`} onClick={setVote}>{point}</button>)}
    </div>
};

export default Points;