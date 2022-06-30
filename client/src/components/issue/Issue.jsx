import React from 'react';
import socket from "../../socket";
import {ROOM_NAME} from "../../services/Helper";

const Issue = ({issue}) => {
    const addVote = () => {
        console.log('add_vote')
        socket.emit('add_vote', {issue, room: ROOM_NAME})
    }

    return (
        <div className={`issue-card`}>
            <div>{issue.title}</div>
            <div>count votes:{issue.points.length}</div>
            <div>
                <button onClick={addVote}>Vote</button>
            </div>
        </div>
    );
};

export default Issue;