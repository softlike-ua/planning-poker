const mongoose = require('mongoose')
const {Schema, model} = mongoose

const roomSchema = new Schema({
    title: String,
    issues: [{type: Schema.Types.ObjectId, ref: 'Issue'}],
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    admin: {type: Schema.Types.ObjectId, ref: 'User'},
    activeIssue: {type: Schema.Types.ObjectId, ref: 'Issue'}
})

module.exports = model('Room', roomSchema)