import React from 'react';
import Points from "../Points";

const Board = ({room}) => {
    let activeIssue = room.issues.find(item => item._id === room.activeIssue)
    let user = room.users.find(item => item.key === localStorage.getItem('plan_key'))
    let points = activeIssue.points.find(item => item.user === user._id)
    return (
        <div id={`board`}>
            <div id={`current-issue`}>
                <h3>{room.activeIssue ? `Current vote` : `No issue for vote`}</h3>
                <div>{room.issues.find(issue => issue._id === room.activeIssue)?.title}</div>
            </div>
            {!points && <Points room={room}/>}
        </div>
    );
};

export default Board;