import React from 'react';

const UserPlace = ({user, room}) => {
    let activeIssue = room.issues.find(item => item._id === room.activeIssue)
    let points = activeIssue.points.find(item => item.user === user._id)
    return (
        <div className={`user-place`}>
            <span>{`${user.name}:  ${points?.point ?? 0}`}</span>
        </div>
    );
};

export default UserPlace;