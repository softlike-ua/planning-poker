import React, {useEffect, useState} from 'react';
import socket from "../../socket";
import {ROOM_NAME} from "../../services/Helper";
import Issue from "./Issue";

const IssueBar = ({room}) => {
    const addIssue = (e) => {
        let issue = prompt('Set new issue')
        if (issue) {
            socket.emit('add_issue', {issue, room: ROOM_NAME})
        }
    }
    useEffect(() => {
    }, [])

    return (
        <div id={`issue-bar`}>
            <div id={`issue-header`}>
                <button onClick={addIssue}>Add issue</button>
            </div>

            <div id={`issue-list`}>
                {room && room.issues.map(issue => <Issue key={issue._id} issue={issue}/>)}
            </div>
        </div>
    );
};

export default IssueBar;