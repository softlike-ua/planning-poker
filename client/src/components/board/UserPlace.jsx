import React from 'react';

const UserPlace = ({user, room}) => {
    let point = 0
    if (room.activeIssue){
        let activeIssue = room.issues.find(item => item._id === room.activeIssue)
        point = activeIssue.points.find(item => item.user === user._id)?.point??0
    }
    return (
        <div className={`user-place`}>
            <span>{`${user.name}:  ${point}`}</span>
        </div>
    );
};

export default UserPlace;