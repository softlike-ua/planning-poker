const Room = require('./Room')
const Issue = require("../issue/Issue");
const User = require("../User/User")


class RoomEvent {
    join(socket) {
        socket.on('join', async ({name, key, room}) => {
            socket.join(room)
            await User.updateOne({key}, {socket: socket.id, name, key}, {upsert: true})
            let user = await User.findOne({key})

            let _room = await Room.findOne({title: room})
            if (!_room) {
                _room = (await Room.create({title: room}))
            }

            const inRoom = _room.users.find(item => item.toString() === user._id.toString())
            if (!inRoom) {
                console.log('not in room')
                _room.users.push(user._id)
                await _room.save()
            }

            let rooms = await Room.findOne({title: room}).populate(['users', 'issues']).exec()
            socket.nsp.to(room).emit('join', rooms)
        })
    }

    disconnecting(socket) {
        socket.on('disconnecting', async () => {
            let socket_rooms = Array.from(socket.rooms)
            const user = await User.findOne({socket: socket.id})
            let _room = await Room.findOne({title: socket_rooms[1]})
            if (_room) {
                let index = _room.users?.indexOf(user._id)
                _room.users?.splice(index, 1)
                await _room.save()

            }
            const rooms = await Room.findOne({title: socket_rooms[1]}).populate(['users', 'issues'])
            socket.nsp.to(socket_rooms).emit('leave_room', rooms)
        })
    }

    addIssue(socket) {
        socket.on('add_issue', async ({issue, room}) => {
            const _issue = await Issue.create({title: issue})
            const _room = await Room.findOne({title: room})
            _room.issues.push(_issue._id)
            await _room.save()
            socket.nsp.to(room).emit('add_issue', await Room.findOne({title: room}).populate(['users', 'issues']))
        })
    }

    addVote(socket) {
        socket.on('add_vote', async ({issue, room}) => {
                let _room = await Room.findOne({title: room})
                _room.activeIssue = issue._id
                await _room.save()
                socket.nsp.to(room).emit('add_vote', await Room.findOne({title: room}).populate(['users', 'issues']))
            }
        )
    }

    setVote(socket) {
        socket.on('set_vote', async ({activeIssue, point, userKey, room}) => {
            let user = await User.findOne({key: userKey})
            let issue = await Issue.findOne({_id: activeIssue})
            console.log(user._id)

            let existPoint = issue.points.find(item => item.user.toString() === user._id.toString())
            if (!existPoint){
                issue.points.push({user: user._id, point})
                await issue.save()
            }
            const _room = await Room.findOne({title: room}).populate(['users', 'issues'])
            socket.nsp.to(room).emit('set_vote', _room)
        })
    }
}

module.exports = new RoomEvent()




