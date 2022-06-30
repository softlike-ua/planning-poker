import React from 'react';
import UserPlace from "./board/UserPlace";

const Users = ({room}) => {
    return (
        <div id={`user-list`}>
            {room.users.map(user => <UserPlace key={user.name} user={user} room={room}/>)}
        </div>
    );
};

export default Users;